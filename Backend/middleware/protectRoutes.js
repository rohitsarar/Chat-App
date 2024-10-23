// import jwt from 'jsonwebtoken'
// import User from '../models/user.models.js';

// const protectRoutes=async(req,res,next)=>{
//     try{
//         const token =req.cookies.jwt;
//         if(!token){
//             return res.status(401).json({error:"Unthorized -No Token Provided"})
//         }

//         const decoded=jwt.verify(token,process.env.JWT_SECRET);

//         if(!decoded){
//             return res.status(401).json({error:"Unauthorized -Invalid Token"});
//         }

//         const user=await User.findById(decoded.userId).select("-password");

//         if(!user){
//             return res.status(404).json({error:'User not found'})
//         }
//             req.user=user
//             next();
        
//     }
//     catch(error){
//       console.log("error in protectRoute middleware:",error.message);
//       res.status(500).json({error:"Internal server error"});
//     }
// };

// export default protectRoutes;



import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        // Check if token is provided
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Find the user using the decoded token's userId
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in protectRoutes middleware:", error.message);

        // Handle specific JWT errors (e.g., token expiration)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Unauthorized - Token Expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Catch-all for other errors
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoutes;
