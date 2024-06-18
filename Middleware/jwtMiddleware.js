const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) => {
    console.log('Inside JWT Middleware');
    try{
        const token = req.headers['authorization'].slice(7)
        console.log(token);

        const jwtVerification = jwt.verify(token,process.env.JWTKEY)
        console.log(jwtVerification);
        req.payload = jwtVerification.userId
        next()
    }
    catch(err){
        res.status(401).json({"Authorization error":err.message})
    }
}

module.exports = jwtMiddleware