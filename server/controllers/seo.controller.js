var SeoService = require("../services/seo.service");

exports.getSeoData = async function(req, res) {
    try {
        let seoData = await SeoService.getSeoData(req.body.isin);
        if (seoData.length === 0) {
            return res.status(200).json({
                status: 404,
                message: "No SEO data found",
            });
        }
        return res.status(200).json({
            status: 200,
            seoData,
            message: "SEOdata retrived successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.addSEO = async function(req, res, next) {
    try {
        let seo = await SeoService.addSeo(req.body);
        return res.status(200).json({
            status: 200,
            seo,
            message: "SEO data added.",
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.updateSEO = async function(req, res, next) {
    try {
        let seo = await SeoService.updateSeo(req.body);
        return res.status(200).json({
            status: 200,
            seo,
            message: "SEO data updated.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};