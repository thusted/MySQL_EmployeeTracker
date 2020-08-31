const sql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "love_bob1",
  database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the init function after the connection is made to prompt the user
  init();
});

const init = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: ["Add a department", "Add a role", "Add an employee", "View all departments", "View all roles", "View all employees", "Update an employee role"]
    }
  ]).then((answers) => {
    if(answers.mainMenu === "Add a department") {
      addDepartment();
      console.log("You want to add a department");
    } else if(answers.mainMenu === "Add a role") {
      addRole();
      console.log("You want to add a role");
    } else if(answers.mainMenu === "Add an employee") {
      addEmployee();
      console.log("You want to add an employee");
    } else if(answers.mainMenu === "View all departments") {
      viewAllDepartments();
      console.log("You want to view all departments");
    } else if(answers.mainMenu === "View all roles") {
      viewAllRoles();
      console.log("You want to view all roles");
    } else if(answers.mainMenu === "View all employees") {
      viewAllEmployees();
      console.log("You want to view all employees");
    } else {
      updateEmployeeRole();
      console.log("You want to update an employee role");
    }
  });
}