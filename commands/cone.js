const getJSON = require('get-json');
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'cone',
	description: 'You\'re on FSD now, friend.',
	execute(message, args) {
		const attachment = new Discord.Attachment('./cone.png', 'cone.png');
		const embed = new Discord.RichEmbed()
				.setTitle(`You\'re on FSD now, **${message.author.username}**.`)
				.attachFile(attachment)
				.setImage('attachment://cone.png');
		message.channel.send({embed});
	},
};