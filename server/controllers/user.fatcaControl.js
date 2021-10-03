var UserFatcaService = require("../services/user.fatcaService");


exports.getFatcaInfo = async function(req, res) {
    try {
        let fatcaData = await UserFatcaService.getFatcaInfo(
            req.body.user_key
        );
        // console.log("fatca", fatcaData);
        if (fatcaData.length === 0) {
            return res.status(200).json({
                status: 404,
                message: "Fatca Not Filled",
            });
        }
        return res.status(200).json({
            status: 200,
            fatcaData,
            message: "Fatca data retrived successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.updateFatca = async function(req, res, next) {
    try {
        let ucc = await UserFatcaService.updateFatca(req.body);
        return res.status(200).json({
            status: 200,
            ucc,
            message: "Fatca data updated.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};