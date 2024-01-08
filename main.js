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

  try {
    const firstQuestion = 'wich account would you like to enter?'
    const accountName = await CommandLine.ask(firstQuestion)
    const account = await Account.find(accountName)
  
    if(account == null) {
      await promptCreateAccount(accountName)
    } else if(account) {
      await propmtTask(account)
    }

  } catch (error) {
    CommandLine.print("ERROR: please try again!")
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
    CommandLine.print(`you have added ${amount} to ${account.name} account and now your balance is ${account.balance}`)

  } else if(response === 'withdraw') {
    const amount =  parseFloat(await CommandLine.ask("how much?"))

    try {
      await account.withdraw(amount);
      CommandLine.print(`you have taken ${amount} from the ${account.name} account and now your balance is ${account.balance}`);

    } catch (error) {
      CommandLine.print("we were unabel to make the withdraw. please ensure you have enough money")
    }
  } else {
    CommandLine.print(`your balance is ${account.balance}`)
  }
} 



main()