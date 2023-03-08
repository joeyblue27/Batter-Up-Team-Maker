const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const members = [];

const questions = () => {
    console.log('Lets Build your team!');
    return inquirer.prompt([
        {
            type: 'list',
            question: "What is the employee's position?",
            name: 'position',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            type: 'input',
            question: "What is the managers team name?",
            name: 'teamName',
            when: (answers) => answers.position === 'Manager',
        },
        {
            type: 'input',
            question: "What is the managers team id?",
            name: 'managerId',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            question: "What is the managers email?",
            name: 'managerEmail',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            question: "What is the team managers office number?",
            name: 'managerOffice',
            when: (answer) => answer.position === 'Manager',
        },
        {
            type: 'input',
            question: "What is the engineers name?",
            name: 'engineerName',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            question: "What is the engineers id?",
            name: 'engineerId',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            question: "What is the engineers email?",
            name: 'engineerEmail',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            question: "What is the engineers Github?",
            name: 'engineergithub',
            when: (answer) => answer.position === 'Engineer',
        },
        {
            type: 'input',
            question: "What is the interns name?",
            name: 'internName',
            when: (answer) => answer.position === 'Intern',
        },
        {
            question: "What is the interns id?",
            name: 'internId',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'input',
            question: "What is the interns email?",
            name: 'internEmail',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'input',
            question: "Where is the interns school?",
            name: 'internSchool',
            when: (answer) => answer.position === 'Intern',
        },
        {
            type: 'confirm',
            question: 'Add another member?',
            name: 'anotherMember',
        },
    ])

        .then((answer) => {
            var team;

            if (answer.position === 'Manager') {
                team = new Manager(answer.teamName,
                    answer.managerId,
                    answer.managerEmail,
                    answer.managerOffice);

            } else if (answer.position === 'Engineer') {
                team = new Engineer(answer.engineerName,
                    answer.engineerId,
                    answer.engineergithub,
                    answer.engineerEmail);

            } else if (answer.position === 'Intern') {
                team = new Intern(answer.internName,
                    answer.internId,
                    answer.internSchool,
                    answer.internEmail);
            }

            members.push(team);
            if (answer.anotherMember) {
                return questions();
            } else {
                return members;
            }
        })
}

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



