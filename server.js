const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const connectDB = require("./config/connectDB");

const user = require("./model/User");

//MiddleWares
app.use(express.json());

// GET :  RETURN ALL USERS
//route:http://localhost:5000/find

app.get("/find", (req, res) => {
    user.find()
        .then((users) => res.json(users))
        .catch((err) => res.json({ msg: err }));
});
// POST :  ADD A NEW USER TO THE DATABASE
//route:http://localhost:5000/add
//access:public
app.post("/add", (req, res) => {
    const { name, age } = req.body;
    const newUser = new User({ name, age });
    newUser
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ msg: err }));
});

// PUT : EDIT A USER BY ID
//route:http://localhost:5000/findEditSave/:userId

app.put("/edit/:userId", (req, res) => {
    User.updateOne(
        { _id: req.params.userId },
        { $set: { name: req.body.name, age: req.body.age } }
    )
        .then((data) => res.json(data))
        .catch((err) => res.json({ msg: err }));
});

// DELETE : REMOVE A USER BY ID
//route:http://localhost:5000/remove/:userId

app.delete("/findIdAndRemove/:userId", (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
});

//Connect To Database
connectDB();
//listening
const port = process.env.PORT || 5000;
app.listen(port, (err) =>
    err ? console.log("erreur") : console.log(`server is running on ${port}`)
);
