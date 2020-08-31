const mysql = require("mysql");
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
    } else if(answers.mainMenu === "Add a role") {
      addRole();
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

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "Please enter the name of the department you would like to add:"
    }
  ]).then((answers) => {
    connection.query(
      "INSERT INTO department SET ?",
      {
        department_name: answers.newDepartment
      },
      (err) => {
        if(err) throw err;
        console.log("Your department was created.");
        //Bring user back to main questions
        init();
      }
    );
  });
}

const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newRoleTitle",
      message: "Please enter the title of the role you would like to add:"
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "Please enter the salary of the role you would like to add:"
    },
    {
      type: "input",
      name: "departmentId",
      message: "Please enter the id of the department this role is under:"
    }
  ]).then((answers) => {
    connection.query(
      "INSERT INTO role SET ?",
      {
        role_title: answers.newRoleTitle,
        role_salary: answers.newRoleSalary,
        department_id: answers.departmentId
      },
      (err) => {
        if(err) throw err;
        console.log("Your role was created.");
        //Bring user back to main questions
        init();
      }
    );
  });
}