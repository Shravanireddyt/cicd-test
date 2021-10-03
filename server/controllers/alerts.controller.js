let AlertService = require("../services/alerts.service")


exports.getAlerts = async(req, res) => {
    try {
        let result = await AlertService.getAlerts(req.body)
        return res.json({ result, message: "Alerts Received successfully." })
    } catch (error) {
        console.log(error, "alerts")
        return res.status(404).json({ message: error.message })
    }
}

exports.createAlert = async(req, res) => {
    try {
        let result = await AlertService.raiseAlert(req.body)
        return res.json({ result, message: "Alert created successfully." })
    } catch (error) {
        console.log(error, "alerts")
        return res.status(404).json({ message: error.message })
    }
}
exports.resolveAlert = async(req, res) => {
    try {
        let result = await AlertService.resolveAlert(req.body)
        return res.json({ result, message: "Alert Deleted successfully." })
    } catch (error) {
        console.log(error, "alerts")
        return res.status(404).json({ message: error.message })
    }
}