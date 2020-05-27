const jwt = require("jsonwebtoken")
const Constants = require("../util/constants")
const Service = require("../services/service")
const ErrorModel = require("../models/object/errorModel")

const auth = async (req, res, next) => {

    try {

        if(!req.header || !req.header("Authorization")){
            throw new ErrorModel(Constants.ERROR_MESSAGE.USER_NOT_LOGGED, Constants.HTTP_CODE.UNAUTHORIZED);
        }

        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "jwtTokenTest")
        const user = await Service.getByDocumentAndToken(decoded.document, token)

        if (!user){
            throw new ErrorModel(Constants.ERROR_MESSAGE.USER_NOT_LOGGED, Constants.HTTP_CODE.UNAUTHORIZED);
        }

        req.user = user;
        
        next();
    } catch (error) {
        res.status(error.code)
        res.send( {"error": error.errorMessage} )
    }

}

module.exports = auth;