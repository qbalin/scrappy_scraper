#!/usr/bin/env node

const puppeteer = require("puppeteer");

const scrape = async timestamp => {
	const browser = await puppeteer.launch();
	// const browser = await puppeteer.launch({executablePath: "/usr/bin/chromium-browser", timeout: 600000});
	let content;

	try {
		const page = await browser.newPage();
		await page.goto("https://my.uscis.gov/en/appointment/", {waitUntil: "networkidle2"});

		let navigationPromise = page.waitForNavigation();
		await page.evaluate(() => document.querySelector("#create-button").click());
		await navigationPromise;

		await page.type("#appointments_appointment_zip", "10035", { delay: 100 });
		await page.evaluate(() => document.querySelector("#field_office_query").click());
		await page.waitFor(3000);
		await page.evaluate(() => document.querySelector("button#NYC").click());
		await page.waitFor(3000);
		await page.evaluate(() =>
			document.querySelector(
				'#NYC-notes input[type=submit][value="See Available Appointments"]'
			).click()
		);
		await page.waitFor(3000);

		content = await page.content();

		await page.pdf({path: `${__dirname}/pdf/page-${timestamp}.pdf`, format: "A4"});
	} catch (e) {
		console.error(e);
	}

	await browser.close();
	return content;
};

module.exports.scrape = scrape;
