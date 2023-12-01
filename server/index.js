const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://vhwang:vhwang@styleme.ac7anh6.mongodb.net/")

// Update the /login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Respond with a structured JSON response
                    res.json({ success: true, user: { name: user.name, email: user.email, city: user.city } });
                } else {
                    res.json({ success: false, message: "The password is incorrect" });
                }
            } else {
                res.json({ success: false, message: "No record exists" });
            }
        })
        .catch(err => res.status(500).json({ success: false, message: "An error occurred. Please try again later." }));
});


app.post('/register', (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// New endpoint to fetch user information by email
app.get('/user/:email', (req, res) => {
    const email = req.params.email;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ message: "An error occurred. Please try again later." }));
});

app.listen(3001, () => {
    console.log("Server is Running")
})
