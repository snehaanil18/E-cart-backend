const products = require('../Models/productSchema')

//get all products
exports.getAllProducts = async(req,res) => {
    try{
        const allProducts = await products.find()
        // console.log(allProducts);
        if(allProducts){
            res.status(200).json(allProducts)
        }
        else{
            res.status(401).json('database empty')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

//view a particular product
exports.getAProduct = async(req,res) => {
  
    try{
        const {id} = req.params
        const viewProduct = await products.findOne({id})
        if(viewProduct){
            res.status(200).json(viewProduct)
        }
        else{
            res.status(401).json('product not found')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

