const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {
	it('Should reject non-string values', ()=> {
		expect(isRealString(23432)).toBeFalsy();
	});

	it('Should reject string with only spaces', () => {
		expect(isRealString('      ')).toBeFalsy();
	});

	it('Should allow string with non-space characters', () => {
		expect(isRealString('test with chars')).toBeTruthy();
	});
})