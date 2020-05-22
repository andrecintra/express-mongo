const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const routes = require("./routes/route")

mongoose
    .connect("mongodb://localhost:27017/andredb", { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true })
    .then(() => {
        const app = express()

        const port = 3001;

        app.use(bodyParser.json())
        app.use("/v1", routes.handler())

        app.listen(port, () => {
            console.log(`Express iniciado na porta ${port}`)
        })
    })