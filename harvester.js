'use strict';

const {Harvester} = require('captcha-manager');
const request = require('request-promise-native');

const harvester = new Harvester();

const availableCaptchaResponseTokens = [];

const siteKey = '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz';
const captchasPerMinute = 5;

async function harvest(){
    for(let i = 0; i < captchasPerMinute; i++){
        availableCaptchaResponseTokens.push(await harvester.getResponse('supremenewyork.com', siteKey));
    }
}

setInterval(harvest, 60000); // harvest every 60 seconds
harvest(); // start harvesting as soon as the script starts

async function checkout(){
    const captchaResponseToken = availableCaptchaResponseTokens.shift(); // returns an available captcha response token or undefined if there are none available
    if(captchaResponseToken === undefined){
        console.log('No available captcha response tokens');
        return false;
    }
    try{
        // body will be the parsed JSON object from the response body
        const {statusCode, body} = await request({
            method: 'POST',
            url: 'https://www.supremenewyork.com/checkout.json',
            gzip: true,
            resolveWithFullResponse: true,
            json: {
                'g-recaptcha-response': captchaResponseToken,
                'utf8': '✓',
                'authenticity_token': '',
                'order[billing_name]': '',
                'order[email]': '',
                'order[tel]': '',
                'order[billing_address]': '',
                'order[billing_address_2]': '',
                'order[billing_address_3]': '',
                'order[billing_city]': '',
                'order[billing_zip]': '',
                'order[billing_country]': '',
                'same_as_billing_address': 1,
                'store_credit_id': '',
                'credit_card[type]': '',
                'credit_card[cnb]': '',
                'credit_card[month]': 10,
                'credit_card[year]': 2017,
                'credit_card[vval]': '',
                'order[terms]': 1,
                'hpcvv': ''
            }
        });
        if(statusCode !== 200){
            console.log('Status code ' + statusCode);
            return false;
        }else{
            console.log('Cart status: ' + body.status);
            return true;
        }
    }catch(error){
        console.log('Could not checkout: ' + error.message);
        return false;
    }
}