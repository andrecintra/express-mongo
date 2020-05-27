const mongoose = require('mongoose');

exports.connectToDB = async () => {

	try {
		await mongoose.connect('mongodb://localhost:27017/andredb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
	}
	catch (error) {
		console.error('Não foi possivel conectar ao banco de dados');
		console.error(error);

		throw error;
	}
};

