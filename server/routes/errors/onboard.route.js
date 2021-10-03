var express = require("express");
var router = express.Router();

var ErrorController = require("../../controllers/error.controller")

router.post("/onboarding/add_error", ErrorController.addErrors)
router.post("/onboarding/get_errors", ErrorController.getErrors)
router.post("/onboarding/delete_error", ErrorController.deleteError)

module.exports = router