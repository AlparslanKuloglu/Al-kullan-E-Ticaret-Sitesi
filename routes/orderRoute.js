const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()



router.route('/deleteOrder').post(authController.deleteOrder)
router.route('/').get(authController.getOrdersPage)


module.exports= router 