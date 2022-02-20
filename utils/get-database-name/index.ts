const getDatabaseName = () => {
  return process.env.NODE_ENV === 'production' ? `admin_mybb` : `dev_bank`
}

export default getDatabaseName
