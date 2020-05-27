const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes/route")
const db = require("./db/mongoose")

db.connectToDB();

const app = express()

const port = process.env.PORT || 3001;

app.use(bodyParser.json())
app.use("/v1", routes.handler())

app.listen(port, () => {
    console.log(`Express iniciado na porta ${port}`)
})
