const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = mongoose.Schema({
    "document": { type: String, index: { unique: true } },
    "name": String,
    "password": String
})

schema.pre("save", async function(next) {
    const user = this;

    if(user.isModified("password")) {
        user["password"] = await bcrypt.hash(user["password"], 8);
    }

    next();
})


module.exports = mongoose.model("User", schema)