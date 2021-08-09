const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const port = 2935
const path = require("./Router")
// const url = "mongodb://localhost/playerAPI"
const url = "mongodb+srv://admin:admin12345@cluster0.bs8eu.mongodb.net/chrisdata?retryWrites=true&w=majority"

const app = express()

mongoose.connect(url, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("server is connected")
})

app.use(express.json())
app.use(cors())
app.get("/", async (req,res) => {
    res.status(200).send("let test some api")
})
app.use("/class/API", path)

app.listen(port, () => {
    console.log(`server is listening to:${port}`)
})