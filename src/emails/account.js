const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = 'YOUR_API_KEY'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chenssuchi09@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        // html: 
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chenssuchi09@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you sometime soon.`,
        // html: 
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}