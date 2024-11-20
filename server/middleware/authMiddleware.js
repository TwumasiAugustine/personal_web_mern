const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const auth = (roles = []) => (req, res, next) => {
    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Access denied. Invalid token.' });
        }

        if (roles.length && decoded.role && !roles.includes(decoded.role)) {
            return res.status(403).send({ message: 'Access denied. Insufficient permissions.' });
        }

        req.user = {
            _id: decoded._id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    });
};

module.exports = auth;
