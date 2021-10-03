let UserSuccessService = require("../services/user.success")

exports.addUser = async(req, res) => {
    try {
        let result = await UserSuccessService.addUser(req.body)
        return res.json(result)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async(req, res) => {
    try {
        let result = await UserSuccessService.updateUser(req.body)
        return res.json(result)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.getUsersStatus = async(req, res) => {
    try {
        let result = await UserSuccessService.getUsersStatus(req.body)
        return res.json({ result })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}