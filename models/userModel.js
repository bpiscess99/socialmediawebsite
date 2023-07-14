const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const {ObjectId} = mongoose.Schema.Types



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
           "Please enter a valid email" // regex for validation of email
        ]    
    },

    password:{
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password length must be upto 6 characters"]
    },

    Photo: {
        type: String,
    },

    followers: [{ type: ObjectId, ref: "User" }],

    following: [{ type: ObjectId, ref: "User" }],

}, {
    timestamps:true
});

// Encrypt password before saving to DB
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }

    // Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    next() // it means once you hashed the password the next thing will execute whatever they are
})

const User = mongoose.model("User", userSchema)
module.exports = User

// mongoose.model("User", userSchema) // for exporting we can use this instead of above