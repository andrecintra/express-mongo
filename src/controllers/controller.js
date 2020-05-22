"use strict"

const ErrorModel = require("../models/object/errorModel")
const Constants = require("../util/constants")
const Service = require("../services/service")

exports.getAll = async () => {

    try {

        return await Service.getAll();

    } catch (error) {

        console.error(error)

        throw error;
    }

}