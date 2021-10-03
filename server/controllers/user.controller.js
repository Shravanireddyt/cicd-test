var UserService = require("../services/user.service");

exports.contactRequests = async(req, res) => {
    try {
        let result = await UserService.contactRequests()
        return res.json(result)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

exports.getUsers = async function(req, res, next) {
    try {
        let users = await UserService.getUsersInfo()
        return res.status(200).json({
            status: 200,
            users,
            message: "Succesfully Users Retrieved",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.getUccInfo = async function(req, res, next) {
    try {
        let activeUsers = await UserService.getActiveUsers();
        if (activeUsers.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "No Active Users Found",
            });
        }
        return res.status(200).json({
            status: 200,
            activeUsers,
            message: "Ucc updated Successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.updateUcc = async function(req, res, next) {
    try {
        let ucc = await UserService.updateUcc(req.body);
        return res.status(200).json({
            status: 200,
            ucc,
            message: "Ucc updated successfully.",
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
exports.addIIN = async(req, res) => {
    try {
        let result = await UserService.addIIN(req.body)
        return res.status(200).json({
            result,
            message: "IIN Added successfully."
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}