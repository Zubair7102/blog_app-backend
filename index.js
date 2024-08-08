const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 6000;

app.use(express.json());


const blog = require("./routes/blog")

// mount
app.use("/api/v1", blog);

const dbConnect = require("./config/database");
dbConnect();

// start the server
app.listen(PORT, () => {
    console.log(`App is started at port no ${PORT}`);
})

app.get("/", (req, res) =>{
    res.send(`<h1>This is Homepage Hello Zubair</h1>`)
})