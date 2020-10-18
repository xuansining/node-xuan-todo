const {Command} =require('commander')
const api=require('./index')
const program = new Command();
program.version('0.0.1');

program
    .option('-d, --add', 'add a task')
program
    .command('add')
    .description('add a task')
    .action((...args) => {

       const word= args.length>1? args[args.length-1]:[]
       const wordString=word.join(' ');
       api.add(wordString).then(()=>{
           console.log('添加失败')},()=>{
           console.log('添加成功')})
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        console.log('all cleared');
    });


program.parse(process.argv)
console.log('hi')
