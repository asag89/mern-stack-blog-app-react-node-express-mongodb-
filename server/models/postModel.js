
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        reguired: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    userPhoto: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default:""
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema)