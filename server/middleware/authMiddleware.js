const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const auth = (roles = []) => (req, res, next) => {
    // Extract token from cookies or Authorization header
    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Access denied. Invalid token.' });
        }

        // Ensure roles is an array and check if the decoded roles include the required roles
        if (roles.length && (!decoded.roles || !Array.isArray(decoded.roles) || !roles.some(role => decoded.roles.includes(role)))) {
            return res.status(403).send({ message: 'Access denied. Insufficient permissions.' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = auth;