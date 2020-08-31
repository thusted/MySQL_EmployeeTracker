const inquirer = require("inquirer");

const init = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: ["Add a department", "Add a role", "Add an employee", "View all departments", "View all roles", "View all employees", "Update an employee role"]
    }
  ])
}

init();