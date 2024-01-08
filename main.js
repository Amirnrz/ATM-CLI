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

  if(account == null) {
    await promptCreateAccount(accountName)
  } else if(account) {
    await propmtTask(account)
  }

}


async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask("account you looking for does not exist would you like to create one? (yes/no)")

  if(response === 'yes') {
    return await Account.create(accountName)
  }
}

async function propmtTask(account) {
  const response = await CommandLine.ask("what would you like to do? (view/withdraw/deposit) ")

  if(response === 'deposit') {
    const amount =  parseFloat(await CommandLine.ask("how much?"))
    await account.deposit(amount)
  } else if(response === 'withdraw') {

  }
}



main()