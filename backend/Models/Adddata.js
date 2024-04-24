const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    title: {
        type: String,
        required :true
    },
    body: {
        type: String,
        required :true
    },
    image: {
        type: String,
        required :true
    },
    date:{
        type: Date,
        default: Date.now

    }
})

module.exports = mongoose.model("savedata",UserSchema)