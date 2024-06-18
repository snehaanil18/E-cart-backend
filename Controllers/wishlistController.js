const wishlists = require('../Models/wishlistSchema')

//add to wishlist
exports.addToWishlist = async(req,res) => {
    const {id,title,price,image} = req.body
    const userId = req.payload
    try{
        //check if product i present in wishlist
        const item = await wishlists.findOne({id,userId})
        if(item){
            res.status(401).json('Product is already in wishlist')
        }
        else{
            const product = new wishlists({id,title,price,image,userId})
            await product.save();
            res.status(200).json('Product added successfully')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}


//view products
exports.viewWishlist = async(req,res) => {
    const userId = req.payload
    try{
        const viewProducts = await wishlists.find({userId})
        if(viewProducts){
            res.status(200).json(viewProducts)
        }
        else{
            res.status(401).json('Wishlist empty')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}


//delete a product
exports.deleteAProduct = async(req,res) => {
    const {id} = req.params
    const userId = req.payload
    try{
        const deleteItem = await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlist = await wishlists.find({userId})
            res.status(200).json(wishlist)
        }
        else{
            res.status(401).json('Product not found')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}