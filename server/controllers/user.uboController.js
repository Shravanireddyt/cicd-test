var UserUboService = require("../services/user.ubo.service");

exports.getUboInfo = async function(req, res) {
    try {
        let uboData = await UserUboService.getUboInfo(req.body.user_key);
        if (uboData.length === 0) {
            return res.status(200).json({
                status: 404,
                message: "UBO Not Filled.",
            });

        }
        return res.status(200).json({
            status: 200,
            uboData,
            message: "ubo data retrived successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.updateUBO = async function(req, res, next) {
    try {
        let ubo = await UserUboService.updateUBO(req.body);
        return res.status(200).json({
            status: 200,
            ubo,
            message: "UBO data updated.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};