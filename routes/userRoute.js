const express = require('express');

const userController = require("../controllers/useerController")
const validation = require("../validation/userSchemaValidation")

const router = express.Router()


router.post('/create', validation.userCreationValidation, userController.createUserController)

router.post('/login', validation.userLoginValidation, userController.loginUserController)

router.get('/details', userController.listUserController)




module.exports = router