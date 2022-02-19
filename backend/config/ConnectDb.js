const mongoose=require("mongoose")
const connectdb=async()=>{
    try {
       await mongoose.connect('mongodb+srv://faicel123:faicel123@cluster0.kzmeo.mongodb.net/ContactDatabase?retryWrites=true&w=majority')
       console.log("DB succefuly connected")
    } catch (error) {
        console.log(error)
    }
    }
    module.exports=connectdb
    

