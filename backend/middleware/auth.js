const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next)=>{
    
    const authHeader = req.headers.authorization;

    // Check for token in Authorization header
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. Authentication token required." });
    }

    try {
        const secret = process.env.JWT_SECRET || "tcmTM";
        const decoded = jwt.verify(token, secret);
        
        // Attach decoded payload to request object for downstream use
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }

}

module.exports = authenticateToken;
