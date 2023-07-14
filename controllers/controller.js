const User = require("../models/userModel");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //Jwt is node package when user sign then it give the id to user and after verify we can send the data
// const Token = require("../models/tokenModel");


const generateToken = (id) => { // this id will come from data where user sign in and database gave him id
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })

}

// signup user
const signUp = asynchandler(async (req, res) => {

    const { name, userName, email, password } = req.body;

    //  Validation that below things should be mandatory fill
    if (!name || !userName || !email || !password) {
        res.status(400)
        throw new Error("Please fill all required field")
    };

    // If email already exist  

    const emailExist = await User.findOne({ email }) //findOne is mongodb function and use to check whether email is already & exist & User.findOne first letter will capital because we were mentioned in "User" in model schema
    if (emailExist) {
        res.status(400)
        throw new Error("This email already exist")
    };

    // Password length must be upto 6 characters

    if (password < 6) {
        res.status(400)
        throw new Error("Passwrod must be upto 6 characters")
    }

    // If user exist 
    const userExist = await User.findOne({ userName }) //finOne is mongodb function and use to check whether email is already exist
    if (userExist) {
        res.status(400)
        throw new Error("This username already exist")
    };



    // create new user
    const user = await User.create({ //User.create is mongodb function and use to create the new user
        name,
        userName,
        email,
        password,

    });


    if (user) {
        const { _id, name, userName, email, password } = user
        res.status(201).json({
            _id, name, userName, email, password,
        });
    } else {
        res.status(400)
        throw new Error("invalid User data")
    }
});

// signin
const signIn = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation 
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add email and password")
    }

    // Check if user exist
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("User not found please sign up")
    }

    // Check exist , check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    // Generate a token
    const token = generateToken(user._id)

    //     // Send http-only cookie
    //     res.cookie("token", token, {
    //     path: "/",
    //     httpOnly: true,
    //     expiresAt: new Date(Date.now() + 1000 * 86400), // 1 day
    //     sameSite: "none",
    //     secure: true,
    // });

    if (user && passwordIsCorrect) {
        const { _id, name, userName, email, password } = user
        res.status(200).json({
           user:{ _id, name, userName, email, password}, token
        });
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
});






module.exports = {
    signUp,
    signIn,


}
