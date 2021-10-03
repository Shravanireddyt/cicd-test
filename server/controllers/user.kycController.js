var UserKYCService = require("../services/user.kycService");

exports.getAdditionalKyc = async function(req, res) {
    try {
        let kycData = await UserKYCService.getAdditionalKyc(
            req.params.user_key
        );
        console.log("kycData", fatcaData);
        if (kycData.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "No KYC data found",
            });
        }
        return res.status(200).json({
            status: 200,
            kycData,
            message: "KYC data retrived successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.updateKyc = async function(req, res, next) {
    try {
        let result = await UserKYCService.updateKyc(req.body);
        return res.status(200).json({
            status: 200,
            result,
            message: "KYC data updated.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};