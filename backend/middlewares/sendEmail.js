const nodeMailer = require('nodemailer');

exports.sendEmail = async(options) =>{
    const transporter = nodeMailer.createTransport({
        host : ""
    });

    const mailOptions = {
        from : "",
        to : options.email,
        subject : options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}