#!/usr/bin/env node

const twilio = require('twilio');
const {
	accountSid,
	authToken,
	targetNumber,
	senderNumber
} = require(`${__dirname}/config`);

const sendSms = () => {
	const client = new twilio(accountSid, authToken);

	return client.messages
		.create({
			body: 'Go to https://my.uscis.gov/en/appointment/ now!',
			to: targetNumber,  // Text this number
			from: senderNumber // From a valid Twilio number
		})
		.then(message => console.log(message.sid));
};

module.exports.sendSms = sendSms;
