const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied.. No Token..' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log("The decoded user is:", req.user);
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;