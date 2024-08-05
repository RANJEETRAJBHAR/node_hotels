const jwt=require('jsonwebtoken');


const jwtAuthMiddleware =(res ,req ,next)=>{

    //first check request headers has authorization or not
    const authorization =req.headers.authorization;
    if(!authorization) return res.status(401).json({error :'Not Found Token'});

    //Extract the jwt token from the Request Headers

    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error : 'Unauthorized'});

    try {


        //verify the jwt token
        const decode= jwt.verify(token,process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user =decode;
        next();

    }catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid token '});
    }
}

//Function to geneate Jwt token 
const generateToken =(userData)=>{

    return jwt.sign(userData,process.env.JWT_SECRET);
}

    module.exports = {jwtAuthMiddleware, generateToken};