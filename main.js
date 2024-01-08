// 1. ask for account 
  // 2.if account does not exist ask to create one
// 3. ask what they want to do
// 4. execute command
  // a. view
  // b. withdraw
  // a. deposit


// exports
const Account = require('./classes/Account');
const CommandLine = require('./classes/CommandLine');

(async () => {
  try {
    const accountName = await CommandLine.ask('Which account would you like to enter?');
    let account = await Account.find(accountName);

    if (!account) {
      const shouldCreateAccount = await promptCreateAccount(accountName);
      if (shouldCreateAccount) {
        account = await Account.create(accountName);
      }
    }

    if (account) {
      await promptTask(account);
    }
  } catch (error) {
    CommandLine.print('ERROR: Please try again!');
  }
})();

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask('The account you are looking for does not exist. Would you like to create one? (yes/no)');
  return response === 'yes';
}

async function promptTask(account) {
  const response = await CommandLine.ask('What would you like to do? (view/withdraw/deposit)');

  if (response === 'deposit') {
    const amount = parseFloat(await CommandLine.ask('How much?'));
    await account.deposit(amount);
    CommandLine.print(`You have added ${amount} to the ${account.name} account. Your balance is now ${account.balance}`);
  } else if (response === 'withdraw') {
    const amount = parseFloat(await CommandLine.ask('How much?'));

    try {
      await account.withdraw(amount);
      CommandLine.print(`You have withdrawn ${amount} from the ${account.name} account. Your balance is now ${account.balance}`);
    } catch (error) {
      CommandLine.print('Unable to make the withdrawal. Please ensure you have enough money.');
    }
  } else {
    CommandLine.print(`Your balance is ${account.balance}`);
  }
}