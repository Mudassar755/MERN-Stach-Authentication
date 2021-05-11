
const dotenv = require("dotenv");
const config = require("config")
dotenv.config();

const sendSms = (phone, message) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: message,
            from: twilioPhone,
            to: phone
        })
        .then(message => console.log(message.sid));
}

module.exports = sendSms;
