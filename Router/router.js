const express = require('express')

const productController = require('../Controllers/productController')

const userController = require('../Controllers/userController')

const wishlistController = require('../Controllers/wishlistController')

const cartContoller = require('../Controllers/cartController')

const jwtMiddleware = require('../Middleware/jwtMiddleware')

const router = express.Router()

//get all products
router.get('/allProducts',productController.getAllProducts)

//register
router.post('/register',userController.registerUser)

//login
router.post('/login',userController.loginUser)

//view a particular product
router.get('/view-product/:id',productController.getAProduct)

//add to wishlist
router.post('/add-to-wishlist',jwtMiddleware,wishlistController.addToWishlist)

router.get('/view-wishlist',jwtMiddleware,wishlistController.viewWishlist)

router.delete('/delete-wishlist-product/:id',jwtMiddleware,wishlistController.deleteAProduct)

//add to cart
router.post('/add-to-cart',jwtMiddleware,cartContoller.addToCart)

router.get('/view-cart',jwtMiddleware,cartContoller.viewCart)

router.delete('/delete-cart-product/:id',jwtMiddleware,cartContoller.deleteProduct)

router.get('/increment-cart/:id',jwtMiddleware,cartContoller.incrementCart)

router.get('/decrement-cart/:id',jwtMiddleware,cartContoller.decrementCart)


module.exports = router