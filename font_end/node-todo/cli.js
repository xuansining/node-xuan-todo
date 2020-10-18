#!/usr/bin/env node
const {Command} = require('commander')
const api = require('./index')
const program = new Command();
// const pkg=require('./package.json')
//
// program.version(pkg.version);

program
    .option('-d, --add', 'add a task')
program
    .command('add')
    .description('add a task')
    .action((...args) => {

        const word = args.length > 1 ? args[args.length - 1] : []
        const wordString = word.join(' ');
        api.add(wordString).then(() => {
            console.log('添加失败')
        }, () => {
            console.log('添加成功')
        })
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.removeAll().then(() => {
        }, () => {
        })
    });

program
    .command('')
    .description('clear all tasks')
    .action(() => {
        api.removeAll().then(() => {
        }, () => {
        })
    });


const len = process.argv.length;
if (len === 2) {

     api.showAll().then(()=>{},()=>{})

    //展示所有的数据


} else {
    program.parse(process.argv)

}



