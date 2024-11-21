const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
const User = require('../model/UserModel');
const SignUp = async (req, res) => {

    const {username, email, password, roles} = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (username === password) {
        return res
            .status(400)
            .json({ message: 'Username and password cannot be the same' });
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword,
            roles
        });

        const token = jwt.sign({ userId: userDoc._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });

    } catch (err) {
        res.status(400).json({
            message: 'User registration failed',
            error: err.message
        });
    }
}


const LogIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const passwordOk = bcrypt.compareSync(password, userDoc.password);

        if (passwordOk) {
            jwt.sign(
                {
                    username,
                    password,
                    email: userDoc.email,
                    roles: userDoc.roles,
                },
                process.env.SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true ,
                        sameSite: 'none',
                        maxAge: 3600000
                    }).json({
                        id: userDoc._id,
                        username,
                        roles: userDoc.roles,
                        email: userDoc.email,
                    });
                }
            );
        } else {
            res.status(400).json({ message: 'Wrong credentials' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Login failed', error: err.message })
    }
}

// Get user data from token
const getUserData = async (req, res) => {
    const { token } = req.cookies;
	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}
	jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		res.json({
			id: info.id,
			username: info.username,
			email: info.email,
			roles: info.roles,
		});
	});
};

// Logout user
const LogOut = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}
    

module.exports = {SignUp, LogIn, getUserData, LogOut};