// global
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

// internal npm
// const api = require('./utils/api.js');
// const generateMarkdown = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = [
    // github username
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username.',
        // we need to validate that user entered at least one word
        // https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a GitHub username.");
            }
            return true;
        }
    },
    // github repository
    {
        type: 'input',
        name: 'repository',
        message: 'Enter the name of your repository on GitHub.',
        // we need to validate that user entered at least one word
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter the name of your GitHub repository.");
            }
            return true;
        } 
    },
    // title of project
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project.',
        // we need to validate that user entered at least one word
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter the title of your project.");
            }
            return true;
        }
    },
    // project description
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project.',
        // we need to validate that user entered at least one word
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a description for your project.");
            }
            return true;
        }
    },
    // project installation
    {
        type: 'input',
        name: 'installation',
        message: 'Explain how user would install (if necessary) for Installation Section.',
        // validation not required if question is optional
    },
    // usage of project
    {
        type: 'input',
        name: 'usage',
        message: 'Enter your project instructions and examples of it in use for Usage Section.',
    },
    // select license
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license for your project.',
        // https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/licensing-a-repository
        choices: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib']
        
    },
    // contributing to project
    
    {
        type: 'input',
        name: 'contributing',
        message: 'Explain how users can contribute to your project (if necessary).',
        // validation not required if question is optional
    },
    // test for project
    {
        type: 'input',
        name: 'tests',
        message: 'Provide tests for project, and explain how to test (if necessary).',
        // Validation not required if question is optional
    },
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}

// Reference: https://www.npmjs.com/package/util.promisify
const writeFileAsync = util.promisify(writeToFile);

// function to initialize program
async function init() {
    // https://www.w3schools.com/js/js_errors.asp
    try {
        // reference inquirer array with prompts
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
        // https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Your responses have been logged. Calling to GitHub...");

        
        // const userInfo = await api.getUser(userResponses);
        // console.log("Your GitHub user info: ", userInfo);

        // pass inquirer data and api data to markdown
        console.log("Generating your markdown")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        // write markdown
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// function call to initialize program
init();