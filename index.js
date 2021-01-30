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
            choices; [
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