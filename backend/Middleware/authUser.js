import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async (req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId= token_decode.id
        next()

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
export default authUser










// import jwt from 'jsonwebtoken';

// // User authentication middleware
// const authUser = (req, res, next) => {
//     try {
//         // Extract token from the Authorization header
//         const authHeader = req.headers.authorization;
//         const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

//         if (!token) {
//             return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach the decoded user information to the request
//         req.user = decoded;

//         next(); // Proceed to the next middleware or route
//     } catch (error) {
//         console.error("Token verification error:", error);

//         // Handle specific JWT errors
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ success: false, message: "Token has expired. Please log in again." });
//         }
//         if (error.name === "JsonWebTokenError") {
//             return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
//         }

//         // Generic error response
//         return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
//     }
// };

// export default authUser;
