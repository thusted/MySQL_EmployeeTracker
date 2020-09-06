const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "", //Enter password here
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
      choices: ["Add a department", "Add a role", "Add an employee", "View all departments", "View all roles", "View all employees", "Update an employee role", "Update an employee manager", "Delete a department", "Delete a role"]
    }
  ]).then((answers) => {
    if(answers.mainMenu === "Add a department") {
      addDepartment();
    } else if(answers.mainMenu === "Add a role") {
      addRole();
    } else if(answers.mainMenu === "Add an employee") {
      addEmployee();
    } else if(answers.mainMenu === "View all departments") {
      viewAllDepartments();
    } else if(answers.mainMenu === "View all roles") {
      viewAllRoles();
    } else if(answers.mainMenu === "View all employees") {
      viewAllEmployees();
    } else if (answers.mainMenu === "Update an employee role") {
      updateEmployeeRole();
    } else if (answers.mainMenu === "Update an employee manager") {
      updateEmployeeManager();
    } else if (answers.mainMenu === "Delete a department") {
      deleteDepartment();
    } else if (answers.mainMenu === "Delete a role") {
      deleteRole();
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

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newEmployeeFirstName",
      message: "What is the first name of your employee?"
    },
    {
      type: "input",
      name: "newEmployeeLastName",
      message: "What is the last name of your employee?"
    },
    {
      type: "input",
      name: "newEmployeeRoleId",
      message: "What is the role id of your employee?"
    },
    {
      type: "input",
      name: "newEmployeeManagerId",
      message: "What is the manager id of your employee? (This field can be left blank if your employee has no manager.)"
    }
  ]).then((answers) => {
    //If user leaves manager id blank, make the value null for the database entry
    if(answers.newEmployeeManagerId === "") {
      answers.newEmployeeManagerId = null;
    };

    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answers.newEmployeeFirstName,
        last_name: answers.newEmployeeLastName,
        role_id: answers.newEmployeeRoleId,
        manager_id: answers.newEmployeeManagerId
      },
      (err) => {
        if(err) throw err;
        console.log("Your employee was created.");
        //Bring user back to main questions
        init();
      }
    );
  });
}

const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err) throw err;
    console.table(res);

    //Bring user back to main questions
    init();
  })
}

const viewAllRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if(err) throw err;
    console.table(res);

    //Bring user back to main questions
    init();
  })
}

const viewAllEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if(err) throw err;
    console.table(res);

    //Bring user back to main questions
    init();
  })
}

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Please enter the id of the employee who's role you would like to update:"
    },
    {
      type: "input",
      name: "updatedRoleId",
      message: "Please enter the new role id:"
    }
  ]).then((answers) => {
    connection.query("UPDATE employee SET ? WHERE ?",
    [
      {
        role_id: answers.updatedRoleId
      },
      {
        id: answers.employeeId
      }
    ], (err) => {
      if(err) throw err;
      console.log("Successfully updated employee role.");

      //Bring user back to main questions
      init();
    });
  });
}

const updateEmployeeManager = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Please enter the id of the employee who's manager you would like to update:"
    },
    {
      type: "input",
      name: "updatedManagerId",
      message: "Please enter the new manager id:"
    }
  ]).then((answers) => {
    connection.query("UPDATE employee SET ? WHERE ?",
    [
      {
        manager_id: answers.updatedManagerId
      },
      {
        id: answers.employeeId
      }
    ], (err) => {
      if(err) throw err;
      console.log("Successfully updated employee manager.");

      //Bring user back to main questions
      init();
    });
  });
}

const deleteDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Please enter the name of the department you would like to delete:"
    }
  ]).then((answers) => {
    connection.query("DELETE FROM department WHERE ?",
    [
      {
        department_name: answers.departmentName
      }
    ], (err, res) => {
      if(err) throw err;
      console.log("Successfully deleted department.");

      //Bring user back to main questions
      init();
    });
  });
}

const deleteRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "Please enter the name of the role you would like to delete:"
    }
  ]).then((answers) => {
    connection.query("DELETE FROM role WHERE ?",
    [
      {
        role_title: answers.roleTitle
      }
    ], (err, res) => {
      if(err) throw err;
      console.log("Successfully deleted role.");

      //Bring user back to main questions
      init();
    });
  });
}
