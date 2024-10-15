const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const User = require('./Models/UserModel');
const Post = require('./Models/PostModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs')
const uploadMiddleware = multer({ dest: 'uploads/' });
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10);


const { MONGODB_URL, PORT, SECRET } = process.env;

if (!MONGODB_URL || !PORT || !SECRET) {
	console.error(
		'MONGODB_URL, PORT, and SECRET must be defined in the .env file',
	);
	process.exit(1);
}

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ['http://localhost:5173'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	}),
);


app.post('/blog/register', async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const userDoc = await User.create({ username, email, password:bcrypt.hashSync(password, salt) });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e)
    }
})

app.post('/blog/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const userDoc = await User.findOne({ username });
		const passwordOk = bcrypt.compareSync(password, userDoc.password);
		if (passwordOk) {
			jwt.sign({ username, id: userDoc._id }, SECRET, (err, token) => {
				if (err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username,
                    email: userDoc.email
                });
			});
		} else {
			res.status(400).json('wrong credentials');
		}
	} catch (e) {
		res.status(400).json(e);
	}
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/blog/create_post', uploadMiddleware.single('file'), async(req, res) => {
	const { originalname, path } = req.file;
	const parts = originalname.split('.');
	const ext = parts[parts.length - 1];
	const newPath = path + '.' + ext;
	fs.renameSync(path, newPath);

	const { title, summary, content } = req.body;
	const postDoc = await Post.create({
		title,
		summary, 
		content,
		thumbnail:newPath,
	})

	res.json(postDoc)

})
// Connect to MongoDB and start the server
mongoose
	.connect(MONGODB_URL)
	.then(() => {
		console.log('App connected to database');
		app.listen(PORT, (err) => {
			if (err) {
				console.error(`Error starting server on port ${PORT}`, err);
			} else {
				console.log(`Server is listening on port ${PORT}`);
			}
		});
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
		process.exit(1); // Exit the process to avoid further issues
	});

// Root endpoint
app.get('/', (req, res) => {
	res.send('Server is up and running');
});

