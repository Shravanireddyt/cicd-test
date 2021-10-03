var express = require("express");
var router = express.Router();

var MasterController = require("../controllers/master.controller")

router.get("/bank_codes", MasterController.getBanksDetails)
router.get("/exemption_codes", MasterController.getExemptionCat)
router.get("/state_codes", MasterController.getSateData)
router.get("/country_data", MasterController.getCountryData);
router.get("/city_data", MasterController.getCityData);
router.get("/product_data", MasterController.getProductData);



module.exports = router