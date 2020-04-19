const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
async function promptUser() {

    return inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "Email address?",
            name: "email"
        },
        {
            type: "checkbox",
            message: "Role?",
            choices: ["Manager", "Engineer", "Intern"],
            name: "role"
        }
    ]);
};
async function promptManager() {

    return inquirer.prompt([
        {
            type: "input",
            message: "Office Number?",
            name: "officeNumber"
        },
        {
            type: "list",
            message: "Add more?",
            name: "more",
            choices: ["Y","N"],
        }
    ]);
};
async function promptEngineer() {

    return inquirer.prompt([
        {
            type: "input",
            message: "GitHub link?",
            name: "github"
        },
        {
            type: "list",
            message: "Add more?",
            name: "more",
            choices: ["Y","N"],
        }
    ]);
};
async function promptIntern() {

    return inquirer.prompt([
        {
            type: "input",
            message: "School?",
            name: "school"
        },
        {
            type: "list",
            message: "Add more?",
            name: "more",
            choices: ["Y","N"],
        }
    ]);
};
// first get all the standard answers.  then get the additional questions based on the role.
promptUser()
    .then(function (answers) {
        switch (answers.role.toString()) {
            case "Manager":
                promptManager()
                    .then(function (mAnswers) {
                        const { name, id, email, role} = answers;
                        const {officeNumber,more} = mAnswers;
                        const manager = new Manager(name,id,email,officeNumber);
                        if (more === "Y")promptUser()||console.log("Thank you");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                break;
            case "Engineer":
                promptEngineer()
                .then(function (eAnswers) {
                    const { name, id, email, role} = answers;
                    const {github,more} = eAnswers;
                    const engineer = new Engineer(name,id,email,github);
                    if (more === "Y") promptUser()||console.log("Thank you");
                })
                .catch(function (err) {
                    console.log(err);
                });
                break;
            default:
                promptIntern()
                .then(function (iAnswers) {
                    const { name, id, email, role} = answers;
                    const {school,more} = iAnswers;
                    const intern = new Intern(name,id,email,school);
                    if (more === "Y")promptUser()||console.log("Thank you");
                })
                .catch(function (err) {
                    console.log(err);
                });
            // code block
        }
    })
    .catch(function (err) {
        console.log(err);
    });


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
