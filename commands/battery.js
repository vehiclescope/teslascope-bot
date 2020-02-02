const getJSON = require('get-json');
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'battery',
	description: 'Helpful links to battery health information.',
	execute(message, args) {
		const embed = new Discord.RichEmbed()
                .setTitle(`Here are some helpful links about battery health.`)
                .setDescription('https://www.geotab.com/blog/ev-battery-health/');
		message.channel.send({embed});
	},
};