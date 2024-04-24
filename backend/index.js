const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const CreateUser = require("./Routes/Createuser")
const Image = require("./Routes/Image")
const Data = require("./Routes/Data")
const cors = require("cors");


app.use(cors());
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use(bodyParser.json())
mongoose.connect("mongodb+srv://AddImageList:ruturaj1234@cluster0.aj6sh7y.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected")
}).catch((error)=>{
    console.log("error")
})

app.use("/", CreateUser)
app.use("/", Data)
app.use("/", Image)

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})