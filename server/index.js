const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://vhwang:vhwang@styleme.ac7anh6.mongodb.net/")

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user=> {
        if(user){
            if(user.password == password){
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record exists")
        }
    })
})

app.post('/register', (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running")
})