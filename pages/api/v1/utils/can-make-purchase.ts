import { bankLogTitles, insertBankLog } from '../banklogs'
import { getBankBalance } from '../users'

export const canMakePurchase = async ({
  uid,
  amount,
}: PurchaseCheck): Promise<boolean> => {
  const bankBalanceResponse = await getBankBalance({ uid })
  const { bankbalance } = bankBalanceResponse[0]

  if (bankbalance < 0) {
    await insertBankLog({
      title: bankLogTitles.ACTION,
      details: `${uid} had insufficient bank balance for their purchase (negative bank balance ${bankbalance})`,
    })
    return false
  }

  if (bankbalance < amount) {
    await insertBankLog({
      title: bankLogTitles.ACTION,
      details: `${uid} had insufficient bank balance for their purchase (${amount} is more than ${bankbalance})`,
    })
    return false
  }

  if (bankbalance - amount < 0) {
    await insertBankLog({
      title: bankLogTitles.ACTION,
      details: `${uid} had insufficient bank balance for their purchase (purchase would cause a negative bank balance of (${
        bankbalance - amount
      }))`,
    })
    return false
  }

  return true
}
