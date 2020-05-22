const mongoose = require("mongoose")

const schema = mongoose.Schema({
    "document": { type: String, index: { unique: true } },
    "name": String,
    "password": String
})

module.exports = mongoose.model("User", schema)