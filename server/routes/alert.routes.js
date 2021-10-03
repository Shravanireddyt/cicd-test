let router = require('express').Router()
let AlertController = require("../controllers/alerts.controller")

router.post("/get_alerts", AlertController.getAlerts)
router.post("/raise_alert", AlertController.createAlert)
router.put("/resolve_alert", AlertController.resolveAlert)

module.exports = router