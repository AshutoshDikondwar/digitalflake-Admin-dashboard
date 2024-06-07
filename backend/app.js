const express = require('express');
const app = express();
const dotenve = require('dotenv')
const connectDB = require('./db/dbConnect')
const route = require('./routes/route')
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
dotenve.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


connectDB(DATABASE_URL);
app.get("/", (req, res) => {
    res.json({ "message": "hwllo" })
})

app.use("/", route);

app.listen(PORT, () => console.log("Server running on port 5000"))