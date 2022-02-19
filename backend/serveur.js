const express= require("express")
const connectdb = require("./config/ConnectDb.js")
const cors=require("cors")
const app=express()
connectdb()
app.use(express.json())
app.use(cors())
app.use("/contact",require("./routes/ContactRoutes.js"))
const port=4000

app.listen(port,(err)=>{
    err?console.log(err):console.log(`serveur is runing at ${port}`)}
)