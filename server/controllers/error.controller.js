var ErrorService = require("../services/errors.service")

exports.addErrors = async function(req, res, next) {
    try {
        let result = await ErrorService.addErrors(req.body);
        return res.status(200).json({
            status: 200,
            result,
            message: "Erros added.",
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.getErrors = async function(req, res) {
    try {
        let result = await ErrorService.getErrors("onboarding_errors", req.body)
        return res.status(200).json({
            result,
            message: "Errors retrived"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.deleteError = async(req, res) => {
    console.log(req.body)

    try {
        let result = await ErrorService.deleteError(req.body.id, req.body.user_key, "onboarding_errors")
        return res.status(200).json({
            result,
            message: "Error deleted successfully."
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}