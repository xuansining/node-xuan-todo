const {Command} =require('commander')

const program = new Command();
program.version('0.0.1');

program
    .option('-d, --add', 'add a task')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words=args.slice(-1,args.length)[0].join(' ');
        console.log(words)
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        console.log('all cleared');
    });


program.parse(process.argv)
console.log('hi')