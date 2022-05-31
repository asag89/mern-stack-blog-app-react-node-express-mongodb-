
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio:{
        type: String,
        default: "Hi, I am an Ankrom member."
    },
    userPhoto: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)