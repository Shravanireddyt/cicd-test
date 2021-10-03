var express = require("express");
var router = express.Router();

var SeoController = require("../controllers/seo.controller")

router.post("/get_seo_data", SeoController.getSeoData)
router.post("/add_seo", SeoController.addSEO)
router.put("/update_seo", SeoController.updateSEO)


module.exports = router