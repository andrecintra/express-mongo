'use strict';

const ErrorModel = require('../models/object/errorModel');
const Constants = require('../util/constants');
const Service = require('../services/service');

const validateCreatePayloadFields = (body, requiredFields) => {

	for (const key of requiredFields) {

		if (!body[key]) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.PAYLOAD_FIELD_REQUIRED.replace('|field|', key), Constants.HTTP_CODE.BAD_REQUEST);

		}
	}

};

const validatePatchPayloadFields = (body, requiredFields) => {

	const isInRequired = Object.keys(body).some(field => !requiredFields.includes(field));

	const isValueNull = Object.values(body).some(value => !value);

	return isInRequired && isValueNull;
};

exports.getAll = async () => {

	try {

		return await Service.getAll();

	}
	catch (error) {

		console.error(error);

		throw error;
	}

};

exports.getByDocument = async (request) => {

	try {

		if (!request || !request.params || !request.params.document) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.DOCUMENT_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

		}

		return await Service.getByDocument(request.params.document);

	}
	catch (error) {

		console.error(error);

		throw error;
	}

};

exports.createUser = async (request) => {

	try {

		if (!request || !request.body) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.BODY_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

		}

		const requiredFields = ['document', 'name', 'password'];

		validateCreatePayloadFields(request.body, requiredFields);

		return await Service.create(request.body);

	}
	catch (error) {

		console.error(error);

		throw error;
	}

};

exports.deleteByDocument = async (request) => {

	try {

		if (!request || !request.params || !request.params.document) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.DOCUMENT_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

		}

		await Service.deleteByDocument(request.params.document);

	}
	catch (error) {

		console.error(error);

		throw error;
	}

};

exports.updateUser = async (request) => {

	try {

		if (!request || !request.body) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.BODY_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

		}

		if (!request.params || !request.params.document) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.DOCUMENT_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

		}

		const requiredFields = ['document', 'name', 'password'];

		validatePatchPayloadFields(request.body, requiredFields);

		return await Service.updateByDocument(request.params.document, request.body);

	}
	catch (error) {

		console.error(error);

		throw error;
	}

};

exports.login = async (request) => {

	try {

		if (!request || !request.body || !request.body.document || !request.body.password) {

			throw new ErrorModel(Constants.ERROR_MESSAGE.LOGIN_ERROR, Constants.HTTP_CODE.UNAUTHORIZED);

		}

		return await Service.login(request.body.document, request.body.password);

	}
	catch (error) {

		console.error(error);

		throw error;
	}

};