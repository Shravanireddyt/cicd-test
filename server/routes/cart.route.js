let router = require('express').Router()
let CartController = require('../controllers/cart.controller')


router.post('/get_cart_items', CartController.getCartItems)

module.exports = router