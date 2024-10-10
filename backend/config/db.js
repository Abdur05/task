'use-strict'

const mongoose = require('mongoose');//provide straight forward,schema based soultion to model app data with MongoDB
const config = require('./config');//config file which containsdb detail and other detail
const db = config.db.uil;

async function connectDatabase() {
    try {
        console.log(db)
        const result = await mongoose.connect(db);
        if (result) {
            console.log('Database Connected ')
        }
        else {
            console.log('Not Connected')
        }
    } catch (error) {
        console.log(error)
    }
}

connectDatabase()

const dataBase = mongoose.connection;//Accesses the Mongoose connection object, which represents the active database connection and can be used to listen for events or interact with the database directly
module.exports = dataBase