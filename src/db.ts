require("dotenv").config();
import mongoose from 'mongoose';
const {DB_PASSWORD, DB_NAME} = process.env;

export const database = async()=>{
    const db = await mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.nox4h.mongodb.net/?retryWrites=true&w=majority`)
    /* .then(res=> console.log("mongoose conectado")) */
    console.log('Database is connected to', db.connection.host);
}
database();




module.exports = mongoose