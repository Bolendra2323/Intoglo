const User = require('../models/userModel');
const asyncHandler = require('express-async-Handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

//***************************************************************************************************** */
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, phone, pic } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
        return res.status(400).send({ status: false, message: "User already Exist" });


    const user = await User.create({
        name,
        email,
        password,
        phone,
        pic,

    });

    if (user) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            pic: user.pic,
        })
    } else {
        res.status(400);
        throw new Error("User Not Found");
    }
});



//*********************************** LOG IN API *******************************************************************

const authUser = asyncHandler(async(req, res) => {

    let data = req.body


    let Email = await User.findOne({ email: data.email })

    if (!Email) {
        return res.status(400).send({ status: false, message: "Email Doesn't exist" })
    }

    const decryptedPassword = await bcrypt.compare(data.password, Email.password)

    if (!decryptedPassword) {
        return res.status(400).send({ status: false, message: "Password is incorrect" })
    }

    let userId = Email._id

    let token = jwt.sign({ userId: userId }, "Intoglo", { expiresIn: '10h' })

    res.header("x-api-key", token);
    return res.status(201).send({ status: true, message: "User Login Successfully", userId, token: token })

});

//*********************************Upload FILE*************************************************/


module.exports = { registerUser, authUser };