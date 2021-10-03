var express = require("express");
var router = express.Router();

var UserController = require("../controllers/user.controller");
var UserFatca = require('../controllers/user.fatcaControl')
var UserUbo = require("../controllers/user.uboController")
var UserKycController = require("../controllers/user.kycController")
let UserDocsController = require("../controllers/user.docs")
const { isAdmin } = require("../middleware/user.middleware");

router.get("/get_contact_requests", UserController.contactRequests)
router.get("/users_info", isAdmin, UserController.getUsers);
router.get("/active_users", UserController.getUccInfo)

router.post("/fatca_info", UserFatca.getFatcaInfo);
router.post("/ubo_info", UserUbo.getUboInfo)

router.put('/update_user', UserController.updateUcc)
router.put('/add_iin', UserController.addIIN)
router.put('/update_fatca', UserFatca.updateFatca)
router.put("/update_add_kyc", UserKycController.updateKyc)
router.put("/update_ubo", UserUbo.updateUBO)

//docs
router.post("/get_docs", UserDocsController.getDocs)
router.post("/convert_to_tiff", UserDocsController.convertToTiff)


module.exports = router;

// ? user related routes like:getting users, updating users, sending mails to users etc...