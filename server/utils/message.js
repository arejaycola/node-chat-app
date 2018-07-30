var generateMessage = (from, text) => {
	return {
		from,
		text: text, 
		createdAt: new Date().getTime()
	}
};

module.exports = {generateMessage: generateMessage};