const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');


const { MONGODB_URL, PORT, SECRET_KEY } = process.env;

if (!MONGODB_URL || !PORT || !SECRET_KEY) {
	console.error(
		'MONGODB_URL, PORT, and SECRET must be defined in the .env file',
	);
	process.exit(1);
}

const allowedOrigins = process.env.ALLOWED_ORIGINS
	? process.env.ALLOWED_ORIGINS.split(',')
	: ['http://localhost:3000']; 

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error(`Not allowed by CORS ${origin}`));
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Accept',
		'Origin',
		'Access-Control-Allow-Origin',
	],
	optionsSuccessStatus: 200, 
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use('/', authRoutes);
app.use('/', postRoutes);

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
