// Import files from path

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");
const path = require("path");
const fs = require("fs");

// Path to create an html file in the dist folder

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

// input user array

const members = [];

// Function prompts questions according to the users choice of employee. 

function questions () {
    console.log('Lets build a team!');
    return inquirer.prompt([
        {
            type: 'list',
            message: "What is the employee's position?",
            name: 'position',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            type: 'input',
            message: "What is the team managers name?",
            name: 'teamName',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            message: "What is the managers team id?",
            name: 'managerId',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            message: "What is the managers email?",
            name: 'managerEmail',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            message: "What is the team managers office number?",
            name: 'managerOffice',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            message: "What is the engineers name?",
            name: 'engineerName',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            message: "What is the engineers id?",
            name: 'engineerId',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            message: "What is the engineers email?",
            name: 'engineerEmail',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            message: "What is the engineers Github?",
            name: 'engineergithub',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            message: "What is the interns name?",
            name: 'internName',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'input',
            message: "What is the interns id?",
            name: 'internId',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'input',
            message: "What is the interns email?",
            name: 'internEmail',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'input',
            message: "Where is the interns school?",
            name: 'internSchool',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'confirm',
            message: 'Add another member?',
            name: 'anotherMember',
        },
    ])

    // Assignes the employee info from the user input 

        .then((answer) => {
            var team;

            if (answer.position === 'Manager') {
                team = new Manager(
                    answer.teamName,
                    answer.managerId,
                    answer.managerEmail,
                    answer.managerOffice);

            } else if (answer.position === 'Engineer') {
                team = new Engineer(
                    answer.engineerName,
                    answer.engineerId,
                    answer.engineerEmail,
                    answer.engineergithub);

            } else if (answer.position === 'Intern') {
                team = new Intern(
                    answer.internName,
                    answer.internId,
                    answer.internEmail,
                    answer.internSchool);
            }

            //adds to the team

            members.push(team);
            if (answer.anotherMember) {
                return questions();
            } else {
                return members;
            }
        })
}

// Html file is created when employee team is complete

function writeFileAsync(copy, write) {
    return new Promise((createFile) => {

        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR);
        }

        fs.writeFile(copy, write, function (render) {
            if (render) {

                return;
            }
            createFile();
        });
    });
}

questions()
    .then((members) => {
        return render(members);
    })
    .then((file) => {
        return writeFileAsync(distPath, file);
    })
    .then(() => {
        console.log('All Done!');
    })
    .catch((err) => console.error(err));



