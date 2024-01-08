// 1. ask for account 
  // 2.if account does not exist ask to create one
// 3. ask what they want to do
// 4. execute command
  // a. view
  // b. withdraw
  // a. deposit


// exports
const Account = require('./classes/Account')
const CommandLine = require('./classes/CommandLine')

async function main() {
  const firstQuestion = 'wich account would you like to enter?'
  const accountName = await CommandLine.ask(firstQuestion)

  const account = await Account.find(accountName)
  if(account == null) await promptCreateAccount(accountName)
}


async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask("account you looking for does not exist would you like to create one? (yes/no)")

  if(response === 'yes') {
    return await Account.create(accountName)
  }
}



main()