"use strict"

const Users = require("../models/db/user")
const UserDTO = require("../models/dto/userDto")
const LoginDTO = require("../models/dto/loginDto")
const ErrorModel = require("../models/object/errorModel")
const Constants = require("../util/constants")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

        const modelResponse = await Users.findOne({ document })

        if (!modelResponse) {

            throw new ErrorModel(Constants.ERROR_MESSAGE.USER_NOT_FOUND, Constants.HTTP_CODE.NOT_FOUND);

        }

        return UserDTO.fromJson(modelResponse);

    } catch (error) {

        console.error(error)

        throw error;
    }

}

exports.getByDocumentAndToken = async (document, token) => {

    try {

        const modelResponse = await Users.findOne({ "document": document , "tokens.token": token })

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

        const updates = Object.keys(body);

        const user = await Users.findOne({ document })

        updates.forEach((update) => user[update] = body[update]);

        const updatedUser = await user.save();

        return UserDTO.fromJson(updatedUser);

    } catch (error) {

        console.error(error)

        throw new ErrorModel(error.message, Constants.HTTP_CODE.BAD_REQUEST);

    }

}

exports.login = async (document, password) => {

    try {

        const modelResponse = await Users.findOne({ document })

        if (!modelResponse){
            throw new ErrorModel(Constants.ERROR_MESSAGE.LOGIN_ERROR, Constants.HTTP_CODE.UNAUTHORIZED);
        }

        const isValid = await bcrypt.compare(password, modelResponse.password);

        if (!isValid) {
            throw new ErrorModel(Constants.ERROR_MESSAGE.LOGIN_ERROR, Constants.HTTP_CODE.UNAUTHORIZED);
        }

        modelResponse.save();

        return new LoginDTO(modelResponse.document, modelResponse.tokens);

    } catch (error) {

        console.error(error)

        throw error

    }

}