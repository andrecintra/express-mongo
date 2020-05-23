"use strict"

const Users = require("../models/db/user")
const UserDTO = require("../models/dto/userDto")
const ErrorModel = require("../models/object/errorModel")
const Constants = require("../util/constants")

exports.getAll = async () => {

    try {

        const modelResponse = await Users.find()

        if (!modelResponse || !modelResponse.length) {

            throw new ErrorModel(Constants.ERROR_MESSAGE.USER_NOT_FOUND, Constants.HTTP_CODE.NOT_FOUND);

        }

        return modelResponse.map((model) => UserDTO.fromJson(model));

    } catch (error) {

        console.error(error)

        throw error;
    }

};

exports.getByDocument = async (document) => {

    try {

        const modelResponse = await Users.findOne({ "document": document })

        if (!modelResponse) {

            throw new ErrorModel(Constants.ERROR_MESSAGE.USER_NOT_FOUND, Constants.HTTP_CODE.NOT_FOUND);

        }

        return UserDTO.fromJson(modelResponse);

    } catch (error) {

        console.error(error)

        throw error;
    }

}

exports.create = async (body) => {

    try {

        const userToSave = UserDTO.fromJson(body)

        const modelResponse = await Users.create(userToSave)

        return UserDTO.fromJson(modelResponse);

    } catch (error) {

        console.error(error)

        throw new ErrorModel(error.message, Constants.HTTP_CODE.BAD_REQUEST);

    }

}

exports.deleteByDocument = async (document) => {

    try {

        await Users.deleteOne({ "document": document }) 

    } catch (error) {

        console.error(error)

        throw new ErrorModel(error.message, Constants.HTTP_CODE.INTERNAL_SERVER_ERROR);

    }

}

exports.updateByDocument = async (document, body) => {

    try {

        const userToUpdate = UserDTO.fromJson(body)

        await Users.findOneAndUpdate({ "document": document }, userToUpdate)

        return userToUpdate;

    } catch (error) {

        console.error(error)

        throw new ErrorModel(error.message, Constants.HTTP_CODE.BAD_REQUEST);

    }

}