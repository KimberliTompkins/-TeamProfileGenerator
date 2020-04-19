const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeObjects = [];

async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "Email address?",
        name: "email",
      },
      {
        type: "checkbox",
        message: "Role?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
      },
    ]);

    if (answers.role.toString() === "Manager") {
      await promptManager(answers);
    } else if (answers.role.toString() === "Engineer") {
      await promptEngineer(answers);
    } else {
      await promptIntern(answers);
    }
  } catch (err) {
    console.log(err);
  }
}
async function promptManager(answers) {
  try {
    const mAnswers = await inquirer.prompt([
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
      },
    ]);
    const { name, id, email, role } = answers;
    const { officeNumber } = mAnswers;
    const manager = new Manager(name, id, email, officeNumber);
    employeeObjects.push(manager);
    await promptForMore();
  } catch (err) {
    console.log(err);
  }
}

async function promptEngineer(answers) {
  try {
    const eAnswers = await inquirer.prompt([
      {
        type: "input",
        message: "GitHub link?",
        name: "github",
      },
    ]);
    const { name, id, email, role } = answers;
    const { github } = eAnswers;
    const engineer = new Engineer(name, id, email, github);
    employeeObjects.push(engineer);
    await promptForMore();
  } catch (err) {
    console.log(err);
  }
}
async function promptIntern(answers) {
  try {
    const iAnswers = await inquirer.prompt([
      {
        type: "input",
        message: "School?",
        name: "school",
      },
    ]);
    const { name, id, email, role } = answers;
    const { school } = iAnswers;
    const intern = new Intern(name, id, email, school);
    employeeObjects.push(intern);
    await promptForMore();
  } catch (err) {
    console.log(err);
  }
}
async function promptForMore() {
  try {
    const cAnswers = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Add More?",
        choices: ["Y", "N"],
        name: "more",
      },
    ]);
    console.log(cAnswers);
    if (cAnswers.more.toString() === "Y") {
      await promptUser();
    } else {
      console.log("thank you");
    }
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

promptUser();


// first get all the standard answers.  then get the additional questions based on the role.

//promptForMore();

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
