const Controller = require("../controllers/controller")
const express = require("express")

const router = express.Router()

const errorHandler = (res, error) => {

    res.status(error.code)
    res.send( {"error": error.errorMessage} )
    
}

exports.handler = () => {

        router.get("/users", async (req, res) => {

            try {

                const users = await Controller.getAll()
                res.send(users)

            } catch (error) {

                errorHandler(res, error);
            
            }

        })

    return router;
}

