const nodemailer = require('nodemailer');
require('dotenv').config();
const {  EMAIL, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: 'twumasiaugustine.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
    logger: true,
    debug: true
})

// Verify Connection
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});
    
const SendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: EMAIL,
        replyTo: email,
        to: EMAIL,
        subject: `Message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending message' });
        }
}
    

module.exports = {SendMessage};