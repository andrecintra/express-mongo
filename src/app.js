const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const db = require('./db/mongoose');

db.connectToDB();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/v1', routes.handler());

app.listen(port, () => {
	console.log(`Express iniciado na porta ${port}`);
});
