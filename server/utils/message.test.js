var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
	it('Should generate the correct message object', () => {
		var from = 'Rob';
		var text = 'Some message'
		var message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		var from = 'Deb';
		var latitude = '15';
		var longitude = '30';
		var url = 'https://www.google.com/maps?q=15,30';
		var message = generateLocationMessage(from, latitude, longitude);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, url});

	});
});