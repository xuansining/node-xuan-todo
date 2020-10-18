const fs = require('fs')
const os = require('os')
const path = require('path')
const USER_HOME = process.env.HOME || os.homedir();
const dbpath = path.join(USER_HOME, '.todo')
const db = {

    read(path = dbpath) {
        return new Promise((resolve, reject) => {

            fs.readFile(path, {flag: 'a+'}, (readError, content) => {
                let list;
                if (readError) {
                    return reject(readError)
                }
                try {

                    list = JSON.parse(content.toString())

                } catch (e) {
                    list = [];


                }
                resolve(list)


            })


        })
    }
    ,
    write(list, path = dbpath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, list, (error) => {
                if (error) reject(error)
                reject()

            })


        })
    }


}
module.exports.db = db;