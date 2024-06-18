const carts = require('../Models/cartSchema')

//add to cart
exports.addToCart = async(req,res) => {
    const {id,title,price,image,quantity} = req.body
    const userId = req.payload
    try{
        const cartitem = await carts.findOne({id,userId})
        if(cartitem){
            cartitem.quantity+=1
            cartitem.grandTotal = cartitem.quantity * cartitem.price
            await cartitem.save()
            res.status(200).json('Product updated successfully')
        }
        else{
            const newproduct = new carts({id,title,price,image,quantity,userId});
            newproduct.grandTotal = newproduct.quantity * newproduct.price
            await newproduct.save();
            res.status(200).json('Product added successfully')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

//view products
exports.viewCart = async(req,res) => {
    const userId = req.payload
    try{
        const viewProducts = await carts.find({userId})
        if(viewProducts){
            res.status(200).json(viewProducts)
        }
        else{
            res.status(401).json('cart is empty')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

//delete a product
exports.deleteProduct = async(req,res) => {
    const {id} = req.params
    const userId = req.payload
    try{
        const deleteItem = await carts.deleteOne({id})
        if(deleteItem){
            const cart = await carts.find({userId})
            res.status(200).json(cart)
        }
        else{
            res.status(401).json('Product not found')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

exports.incrementCart = async(req,res) => {
    const {id} = req.params
    const userId = req.payload
    try{
        const cartProduct = await carts.findOne({id,userId})
        if(cartProduct){
            cartProduct.quantity+=1
            cartProduct.grandTotal = cartProduct.quantity * cartProduct.price
            await cartProduct.save()
            const allProducts = await carts.find({userId})
            res.status(200).json(allProducts)
        }
        else{
            res.status(401).json('Product not found')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

exports.decrementCart = async(req,res) => {
    const {id} = req.params
    const userId = req.payload
    try{
        const cartProduct = await carts.findOne({id,userId})
        if(cartProduct){
            cartProduct.quantity-=1
            if(cartProduct.quantity==0){
                const deleteProduct = await carts.deleteOne({id})
                const allProducts = await carts.find({userId})
                res.status(200).json(allProducts)
            }
            else{
                cartProduct.grandTotal = cartProduct.quantity * cartProduct.price
                await cartProduct.save()
                const allProducts = await carts.find({userId})
                res.status(200).json(allProducts)
            }

        }
        else{
            res.status(401).json('Product not found')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}