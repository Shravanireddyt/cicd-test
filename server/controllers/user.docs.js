const DocsService = require("../services/user.docs")

exports.getDocs = async(req, res) => {
    try {
        let result = await DocsService.getDocs(req.body)
        return res.json({ result })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

exports.convertToTiff = async(req, res) => {
    try {
        let result = await DocsService.convertToTiff(req.body)
        return res.json({ result })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}