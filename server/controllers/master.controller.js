var MasterService = require("../services/master.service")
exports.getBanksDetails = async function(req, res, next) {
    try {
        let banksDetailes = await MasterService.getBanksDetails();
        if (banksDetailes.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "No Banks Found",
            });
        }
        return res.status(200).json({
            status: 200,
            banksDetailes,
            message: "retrived banks detailss Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.getExemptionCat = async function(req, res, next) {
    try {
        let exemptionDetailes = await MasterService.getExemptionCat();
        if (exemptionDetailes.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            exemptionDetailes,
            message: "retrived exemtpion detailss Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.getSateData = async function(req, res, next) {
    try {
        let stateData = await MasterService.getStateData();
        if (stateData.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            stateData,
            message: "retrived state data detailss Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.getCountryData = async function(req, res, next) {
    try {
        let countryData = await MasterService.getCountryData();
        if (countryData.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            countryData,
            message: "retrived country data detailss Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};


exports.getCityData = async function(req, res, next) {
    try {
        let cityData = await MasterService.getCityData();
        if (cityData.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            cityData,
            message: "retrived city data detailss Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.getProductData = async function(req, res, next) {
    try {
        let productData = await MasterService.getProductData();
        if (productData.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            productData,
            message: "retrived product data detailss Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};