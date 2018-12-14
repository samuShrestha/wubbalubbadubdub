import puppeteer from 'puppeteer'

export default async function bot() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Travel to product
    await page.goto('https://www.supremenewyork.com/shop/tops-sweaters/n7bhgwla4/hv1jby2q9');
    // Hit checkout
    await page.click('#add-remove-buttons > input');
    // Go to checkout page
    await page.waitFor(300);
    await page.goto('https://www.supremenewyork.com/checkout');

    // INPUTTING USER INFO
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Jabooty Swanson', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.type('jabooty@swanson.com', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.type('7204995587', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.type('6969 Nigera St.', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('69691', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.type('Highlands Dip', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('1839803949583', {delay: 15});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('456', {delay: 15});
    await page.click('#cart-cc > fieldset > p:nth-child(4) > label > div > ins');

    await page.evaluate(() => {
        // Text Inputs
        //document.getElementById('order_billing_name').setAttribute('value', 'Jabooty Swanson');
        //document.getElementById('order_email').setAttribute('value', 'jabooty@swanson.com');
        //document.getElementById('order_tel').setAttribute('value', '7204995587');
        //document.getElementById('bo').setAttribute('value', '6969 Nigera St.');
        //document.getElementById('order_billing_zip').setAttribute('value', '69691');
        //document.getElementById('order_billing_city').setAttribute('value', 'Highlands Dip');
        //document.getElementById('nnaerb').setAttribute('value', '1839803949583');
        //document.getElementById('orcer').setAttribute('value', '456');

        // Dropdowns
        document.getElementById('order_billing_state').value = 'CO';
        //document.getElementById('order_billing_country').value = 'USA;
        document.getElementById('credit_card_month').value = '04';
        document.getElementById('credit_card_year').value = '2022';

        // Check Order Terms
        //document.querySelector('#cart-cc > fieldset > p:nth-child(4) > label > div > ins').click();
    });

    // Fake Mouse Movement
    await page.mouse.move(0, 0);
    await page.mouse.move(0, 100);
    await page.mouse.move(100, 100);
    await page.mouse.move(100, 0);
    await page.mouse.move(0, 0);

    await page.click('#pay > input');

    await page.waitFor(100000);

    /* const result = await page.evaluate(() => {
        let name = document.querySelector('#details > h1').innerText;
        let price = document.querySelector('#details > p.price > span').innerText;

        return {
            name,
            price
        };
    }); */

    browser.close();
    return result;
}