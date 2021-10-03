const CartService = require("../services/user.cartservice")


exports.getCartItems = async(req, res) => {
    try {
        let result = await CartService.getCartItems(req.body)
        if (result.length === 0) {
            return res.json({ message: "Cart is empty." })
        }
        return res.json(result)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}