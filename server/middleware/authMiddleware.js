const jwt = require('jsonwebtoken');

const authenticate = (roles = []) => (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res
			.status(401)
			.json({ message: 'Please, login to access this resource.' });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		// Role-based access control
		if (
			roles.length > 0 &&
			(!decoded.roles || !roles.some((role) => decoded.roles.includes(role)))
		) {
			return res
				.status(403)
				.json({ message: 'Access denied. Insufficient permissions.' });
		}

		// Attach user to request
        req.user = { ...decoded, id: decoded.userId };
        console.log(req.user)
		next();
	} catch (err) {
		// Handle token verification errors
		console.error('Token verification error:', err.message);
		return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
	}
};

module.exports = authenticate;
