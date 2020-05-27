const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const schema = mongoose.Schema({
    "document": { type: String, index: { unique: true } },
    "name": String,
    "password": String,
    "tokens": [{
        "token": {
            type: String,
            required: true
        }
    }]
})

schema.pre("save", async function(next) {
    const user = this;

    if(user.isModified("password")) {
        user["password"] = await bcrypt.hash(user["password"], 8);
    }

    const token = jwt.sign({"document": user.document.toString()}, "jwtTokenTest")
    user["tokens"].push({ token })

    next();
})


module.exports = mongoose.model("User", schema)