"use strict"

const ErrorModel = require("../models/object/errorModel")
const Constants = require("../util/constants")
const Service = require("../services/service")

const validatePayloadFields = (body, requiredFields) => {

    for (key of requiredFields) {

        if (!body[key]) {

            throw new ErrorModel(Constants.ERROR_MESSAGE.PAYLOAD_FIELD_REQUIRED.replace("|field|", key), Constants.HTTP_CODE.BAD_REQUEST);

        }
    }

}

exports.getAll = async () => {

    try {

        return await Service.getAll();

    } catch (error) {

        console.error(error);

        throw error;
    }

}

exports.getByDocument = async (request) => {

    try {

        if (!request && !request.document) {

            throw new ErrorModel(Constants.ERROR_MESSAGE.DOCUMENT_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

        }

        return await Service.getByDocument(request.document);

    } catch (error) {

        console.error(error)

        throw error;
    }

}

exports.createUser = async (request) => {

    try {

        if (!request && !request.body) {

            throw new ErrorModel(Constants.ERROR_MESSAGE.BODY_REQUIRED, Constants.HTTP_CODE.BAD_REQUEST);

        }

        const requiredFields = ["document", "name", "password"];

        validatePayloadFields(request.body, requiredFields);

        return await Service.create(request.body);

    } catch (error) {

        console.error(error)

        throw error;
    }

}