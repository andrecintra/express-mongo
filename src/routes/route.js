const Controller = require("../controllers/controller")
const express = require("express")
const Constants = require('../util/constants')

const router = express.Router()

const errorHandler = (res, error) => {

    res.status(error.code)
    res.send( {"error": error.errorMessage} )
    
}

exports.handler = () => {

        router.get("/users", async (req, res) => {

            try {

                const users = await Controller.getAll();
                res.status(Constants.HTTP_CODE.OK)
                res.send(users);

            } catch (error) {

                errorHandler(res, error);
            
            }

        });

        router.get("/user/:document", async (req, res) => {

            try {

                const user = await Controller.getByDocument(req);
                res.status(Constants.HTTP_CODE.OK)
                res.send(user);

            } catch (error) {
                
                errorHandler(res, error);

            }
        })

        router.post("/user", async (req, res) => {

            try {

                const user = await Controller.createUser(req);
                res.status(Constants.HTTP_CODE.CREATED)
                res.send(user);

            } catch (error) {
                
                errorHandler(res, error);

            }
        })

        router.delete("/user/:document", async (req, res) => {

            try {

                const user = await Controller.deleteByDocument(req);
                res.status(Constants.HTTP_CODE.NO_CONTENT).send();

            } catch (error) {
                
                errorHandler(res, error);

            }
        })

        router.patch("/user/:document", async (req, res) => {

            try {

                const user = await Controller.updateUser(req);
                res.status(Constants.HTTP_CODE.OK)
                res.send(user);

            } catch (error) {
                
                errorHandler(res, error);

            }
        })

        router.post("/user/login", async (req, res) => {

            try {

                const user = await Controller.login(req)
                res.status(Constants.HTTP_CODE.OK)
                res.send(user);

            } catch (error) {
                
                errorHandler(res, error);

            }
        })


    return router;
}

