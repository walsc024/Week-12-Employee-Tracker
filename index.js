//========== Dependencies =========//

const inquirer = require("inquirer")
const mysql = require("mysql")




const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "25378",
    database: "employee_trackerDB"
});

// Initial Prompt //
connection.connect(function(err) {
    inquirer.prompt ([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees?",
                "View All Employees By Role?",
                "View All Employees By Departments",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
            ]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case "View All Employees?":
                viewAllEmployees();
            break;

            case "View All Employees By Roles?":
                viewAllRoles();
            break;

            case "View All Employees By Departments":
                viewAllDepartments();
            break;

            case "Add Employee?":
                addEmployee();
            break;

            case "Update Employee":
                updateEMployee();
            break;

            case "Add Role":
                addRole();
            break;

            case "Add Department?":
                addDepartment();
            break;
        }
    })
})
// View All Employees //

function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}

// View All Roles //
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
}

// View All Employees By Department // 

function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }

  // Select Role Quieries Role Title for Add Employee Prompt //
  var roleArr = [];
  function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
  
    })
    return roleArr;
  }
// Select Role Quieries The Managers for Add Employee Prompt //
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

  



