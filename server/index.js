const express = require('express');
const nodemailer = require('nodemailer');
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


const { MONGODB_URL, PORT, SECRET, ADMIN_EMAIL, EMAIL, EMAIL_PASSWORD } = process.env;

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

// Nodemailer setup
const transporter = nodemailer.createTransport({
	host: 'twumasiaugustine.com',
	port: 465,
	secure: true,
	auth: {
		user: EMAIL, // Your custom domain email address
		pass: EMAIL_PASSWORD, // Your email password or App Password
	},
	tls: {
		rejectUnauthorized: false,
	},
	logger: true,
	debug: true,
});

// Verify transporter connection
transporter.verify(function (error, success) {
	if (error) {
		console.error('Error verifying transporter:', error);
	} else {
		console.log('Server is ready to take our messages');
	}
});


// Send message via email
app.post('/send_message', async (req, res) => {
	const { name, email,  message } = req.body;

	// Set up email options
	const mailOptions = {
		from: `"Twumasi Augustine" <${EMAIL}>`,
		to: ADMIN_EMAIL,
		replyTo: ADMIN_EMAIL,
		subject: `New Message from ${name}`,
		html: `
			<h2>Contact Form Submission</h2>
			<p><strong>Name:</strong> ${name}</p>
			<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
			<p><strong>Message:</strong></p>
			<p>${message}</p>
			<hr>
			<p style="font-size: 0.9em;">This message was sent from the contact form on <a href="https://twumasiaugustine.com">twumasiaugustine.com</a></p>
		`
	};

	try {
		// Send the email
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Message sent successfully' });
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({ message: 'Error sending message' });
	}
});


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
		process.exit(1); 
	});

// Root endpoint
app.get('/', (req, res) => {
	res.send('Server is up and running');
});

