import inquirer from "inquirer";
import chalk from "chalk";
// Make a Array & Cinditional Variable
let todo_list = [];
let while_Condition = true;
//-------------------------------- Print Welcome Message ---------------------------------//
console.log(chalk.bold.rgb(204, 204, 204)(`\n  \t\t <<<=============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>    ${chalk.bold.hex('#9999FF')('Welcome To \'Tafzeel Ahmed Khan\' Todo-List App')}   <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<=============================================>>>\n`));
//-------------------------------- Main Function to handle options ---------------------------------//
let main = async () => {
    while (while_Condition) {
        // Display Options
        let options = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Choose an option ",
                choices: ["Add Task ➕", "Edit Task ✍🏻", "View TODO-List 📋", "Remove Task ❌", "Exit 🔚"],
            }
        ]);
        // Calling apprpriate functions based on user choice
        if (options.choices === "Add Task ➕") {
            await add_function();
        }
        else if (options.choices === "Edit Task ✍🏻") {
            await editTask();
        }
        else if (options.choices === "View TODO-List 📋") {
            await viewList();
        }
        else if (options.choices === "Remove Task ❌") {
            await deleteTask();
        }
        else if (options.choices === "Exit 🔚") {
            let userAns = await inquirer.prompt([
                {
                    name: "selection",
                    type: "confirm",
                    message: "Do you want to Exit?",
                    default: true,
                },
            ]);
            if (userAns.selection === true) {
                while_Condition = false;
            }
            else {
                while_Condition = true;
            }
        }
    }
    console.log(chalk.yellow.bold("\n\tThank you for using TODO-List. 😊"));
};
//-------------------------------- ADD Task Function ---------------------------------//
let add_function = async () => {
    let addTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: " Write the task you want to add:"
        }
    ]);
    if (addTask.task !== "") {
        todo_list.push(addTask.task);
        console.log(`\n \t "${chalk.bold.green(addTask.task)}" This task added successfully in your TODO-list.✅`);
        viewList();
    }
    else {
        console.log(chalk.red("\n \t You cannot enter an empty item in the list.❗\n"));
    }
};
//-------------------------- View TODO-List Function -----------------------------//
let viewList = async () => {
    if (todo_list.length > 0) {
        console.log("\n \t\t\t Your Todo-List: \n");
        todo_list.forEach((task, index) => {
            console.log(`\t\t\t ${index + 1}: ${chalk.cyanBright(task)} \n`);
        });
    }
    else {
        console.log(chalk.red("\n \t\t Your TODO-list is empty.❗ \n"));
    }
};
//--------------------------- Remove Task Function ------------------------------//
let deleteTask = async () => {
    await viewList();
    let deleteTask_prompt = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' number of task you want to delete:",
        }
    ]);
    // Make a Condition If user didn't enter any index number don't removed any task
    if (deleteTask_prompt.index >= 1, deleteTask_prompt.index <= todo_list.length) {
        let deletedTask = todo_list.splice(deleteTask_prompt.index - 1, 1);
        console.log(`\n\t You removed this task from your TODO-list: "${chalk.bold.redBright(deletedTask)}" \n`);
    }
    else {
        console.log(chalk.red(`\n\t You didn't enter any correct index number.❗ \n`));
    }
    ;
};
//--------------------------- Edit Task Function ------------------------------//
let editTask = async () => {
    await viewList();
    let editTask_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' number of task you want to edit:",
        }
    ]);
    // Make a Condition If user didn't enter any index number don't edit any task
    if (editTask_index.index > 0 && editTask_index.index <= todo_list.length) {
        let updatedTask_prompt = await inquirer.prompt([
            {
                name: "updated_task",
                type: "input",
                message: "Enter the new task:",
            }
        ]);
        // Make a Condition If user give index no but didn't write anything in task don't update it
        if (updatedTask_prompt.updated_task !== "") {
            todo_list[editTask_index.index - 1] = updatedTask_prompt.updated_task;
            console.log(`\n Task at index no. ${chalk.bold.green(editTask_index.index)} is updated successfully.✅ \n`);
        }
        else {
            console.log(chalk.red(`\n\t You didn't write anything to update task.❗\n`));
        }
    }
    else {
        console.log(chalk.red(`\n\t You didn't enter any correct index number.❗ \n`));
    }
    ;
};
// Call a Main function to run the program
main();
