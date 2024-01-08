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

  if(account) {
    console.log('found an account');
  } else if(!account) {
    console.log('cannot find');
  }
}



main()