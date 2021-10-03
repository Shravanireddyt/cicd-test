let router = require('express').Router()
let UserSuccessController = require("../controllers/user.success.controller")

router.post("/add/user_status", UserSuccessController.addUser)
router.post("/update/user_status", UserSuccessController.updateUser)
router.post("/get_user_status", UserSuccessController.getUsersStatus)

module.exports = router