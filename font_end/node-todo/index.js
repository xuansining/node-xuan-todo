const {db}=require('./db')
module.exports.add = async (title)=> {
    const list=await db.read()
    if(title){
        const task={
            title:title,
            done:false
        }
        list.push(task)
    }
    const message=await db.write(JSON.stringify(list)+'\n');
    if(message){
        console.log(message)
    }

}

