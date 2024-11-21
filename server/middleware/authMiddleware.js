const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

const auth = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
	if (!token) return res.status(401).json({ error: 'Unauthorized' });

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);
		console.log(user)
		if (!user) return res.status(404).json({ error: 'User not found' });

		req.user = { id: user._id, username: user.username };
		next();
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' });
	}
};


const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Please, login to access this resource.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user ={ ...user, id:user.userId};
        next();
    });
};


module.exports = authenticate;
