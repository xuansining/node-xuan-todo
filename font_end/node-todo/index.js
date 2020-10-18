const {db} = require('./db')
const inquirer = require('inquirer')
module.exports.add = async (title) => {
    const list = await db.read()
    if (title) {
        const task = {
            title: title,
            done: false
        }
        list.push(task)
    }
    console.log(list)
    const message = await db.write(JSON.stringify(list) + '\n');
    if (message) {
        console.log(message)
    }

}
module.exports.removeAll = async () => {
    await db.write('[]');
}

function askForTask(list) {
    const taskList = list.map((ele, index) => {
        let flag = ele.done ? '[X]' : '[_]'
        return {
            name: `${flag}${index + 1}-----${ele.title}`,
            value: `${index}`,

        };
    })
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'task',
                message: '请选择你的任务',
                loop: false,
                choices: [...taskList, {name: '退出', value: '-1'}, {name: '创建任务', value: '-2'}],
            },
        )
        .then((answers) => {
            const index = answers['task']
            askForAction(list,index)


        });

}
function quit(list,index) {

}
function askForAction(list,index) {
    const operateList = [
        {name: '设为完成', value: 'setAsComplete'},
        {name: '删除任务', value: 'removeTask'},
        {name: '修改任务', value: 'updateTask'},
        {name: '退出',value:'quit'}

    ]
    if (index >= 0) {
        inquirer
            .prompt(
                {
                    type: 'list',
                    name: 'opt',
                    message: '操作任务',
                    choices: operateList,
                },
            )
            .then((operate) => {
                const actions={setAsComplete,removeTask,updateTask};
                const action=actions[operate['opt']];
                action && action(list,index)


            });
    } else if (index < -1) {
        createTask(list, index)
    }
}
function saveList(list) {

        db.write(JSON.stringify(list)).catch(()=>{})

}
function setAsComplete(list, index) {

    list[index].done = true;
    saveList(list)
}

function removeTask(list, index) {
    list.splice(index, 1)
    saveList(list)
}

function updateTask(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '输入标题',
        default: list[index].title
    }).then((title) => {
        list[index].title = title.title;
        saveList(list)
    },(e)=>{

    })
}

function  createTask (list, index){
    inquirer.prompt({
        type: 'input',
        name: 'createTask',
        message: '输入标题',
    }).then((title) => {

        list.push({title: title['createTask'], done: false})
        saveList(list)

    })
}

module.exports.showAll = async () => {
    const list = await db.read();
    askForTask(list)

}
