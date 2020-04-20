const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFileSync);
const render = require("./lib/htmlRenderer");
const employees = [];

// standard questions that every role is asked
async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Employee name?",
        name: "name",
      },
      {
        type: "input",
        message: "ID number?",
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
//Manager question
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
    employees.push(manager);
    await promptForMore();
  } catch (err) {
    console.log(err);
  }
}
//Engineer
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
    employees.push(engineer);
    await promptForMore();
  } catch (err) {
    console.log(err);
  }
}
//Intern
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
    employees.push(intern);
    await promptForMore();
  } catch (err) {
    console.log(err);
  }
}
//should we add more?  If yes start over if not then render the html
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
    
    if (cAnswers.more.toString() === "Y") {
      await promptUser();
    } else {
      console.log("thank you");
      //render html
     const buildHtml = render(employees);
     writeFileAsync(outputPath, buildHtml);
   
    }
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

promptUser();


