const getJSON = require('get-json');

module.exports = {
	name: 'meme',
	description: 'Satisifies @jpar\'s need for memes.',
	execute(message, args) {
        message.channel.send('Meme.');
	},
};