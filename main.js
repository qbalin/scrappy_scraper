#!/usr/bin/env node

const {saveContent} = require(`${__dirname}/contentSaver`);
const {scrape} = require(`${__dirname}/scraper`);
const {sendSms} = require(`${__dirname}/smsSender`);
const doOnce = require(`${__dirname}/doOnce`);

const UNAVAILABLE_STRING = 'Currently, there are no available appointments. Please check again tomorrow.';

(async() => {
	const timestamp = (new Date()).toISOString();

	const pageContent = await scrape(timestamp);
	await saveContent(pageContent, timestamp);

	if (!pageContent.includes(UNAVAILABLE_STRING)) {
		doOnce(sendSms)
	}
})();
