const express = require("express")
const Contact = require("../models/Contact")
const router = express.Router()
//test
router.get("/test", (req, res) => {
    res.send("hello from backend")
})
//ajout d'un contact
//METHOD POST
router.post("/", async (req, res) => {
    try {
        const newContact = new Contact(req.body)
        const existCont = await Contact.findOne({ email: req.body.email })
        if (existCont) {
            return (res.status(400).send("email existant"))
        }
        await newContact.save()
        res.send({ newContact, msg: "added succfuly" })

    } catch (error) {
        res.status(400).send(error.message)
    }
})
//METHOD GET
router.get("/list", async (req, res) => {
    try {
        const allCont = await Contact.find()
        res.send({ allCont })
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//METHOD DELETE
router.delete("/contdel/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const delCont = await Contact.deleteOne({ _id: req.params.id })
        console.log(delCont);
        if (delCont.deletedCount == 1) {
           return (res.status(200).send({ msg: "user deleted succesfuly" }))

        }
            res.status(400).send({ msg: "user already deleted" })
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//EDIT USER WITH PUT METHOD
router.put("/updateuser/:id",async (req,res)=>{
    const upContExist = await Contact.findById(req.params.id)
    
   try {
        if (!upContExist) {
            return(res.status(400).send({msg:"verifier votre id"}))
        }
        const upCont = await Contact.updateOne({_id:req.params.id},{$set:{...req.body}})
        if (upCont.modifiedCount) {
            return(res.status(200).send({msg:"modifyed succesfuly"}))
        }
            res.status(400).send({msg:"already modifyed"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//METHOD GET ONE CONTACT
router.get("/find/:id", async (req, res) => {
    try {
        const oneCont = await Contact.findById(req.params.id)
        res.send({ oneCont })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router