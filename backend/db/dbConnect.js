const monggose = require('mongoose');

const connectDB = async (DATABASE_URL) => {
    DB_OPTIONS = {
        dbName: 'dashboard'
    }
    try {
        await monggose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Database connection failed");
    }
}

module.exports = connectDB;