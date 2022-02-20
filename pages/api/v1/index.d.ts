type Team = {
  id: number
  name: string
  acronym: string
  rosterforumid: number
  league: string
  canDoBigTraining: number
}

type BankTransaction = {
  id?: number
  uid: number
  createdbyuserid: number
  bankerapproverid?: number
  date?: Date
  amount: number
  title: string
  description: string
  groupid?: number
}

type BankTransactionRequest = {
  id?: number
  uid: number
  amount: number
  title: string
  description: string
  groupid: number
}

type BankTransactionGroup = {
  id: number
  creatorid: number
  bankerid: number
  groupname: string
  requestdate: Date
  isapproved: number
  decisiondate: Date
}

type BankLog = {
  id?: number
  title: string
  details: string
  date?: Date
}
