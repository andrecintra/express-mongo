const mongoose = require('mongoose');

exports.connectToDB = async () => {

	try {
		await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
	}
	catch (error) {
		console.error('Não foi possivel conectar ao banco de dados');
		console.error(error);

		throw error;
	}
};

