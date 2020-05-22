"use strict"

const Users = require("../models/db/user")
const UserDTO = require("../models/dto/userDto")
const ErrorModel = require("../models/object/errorModel")
const Constants = require("../util/constants")

exports.getAll = async () => {

    try {

        const modelResponse = await Users.find()

        if (!modelResponse || modelResponse.length){
            throw new ErrorModel(Constants.ERROR_MESSAGE.USER_NOT_FOUND, Constants.HTTP_CODE.NOT_FOUND)
        }

        return modelResponse.map((model) => UserDTO.fromJson(model));

    } catch (error) {

        console.error(error)

        throw error;
    }

}