const nodeMailer = require('nodemailer');

exports.sendEmail = async(options) =>{
    const transporter = nodeMailer.createTransport({});

    const mailOptions = {
        from : "Nodemailer Contact"
    }
}