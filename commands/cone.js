const getJSON = require('get-json');
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'cone',
	description: 'You\'re on FSD now, friend.',
	execute(message, args) {
		const attachment = new Discord.MessageAttachment('./cone.png', 'cone.png');
		const embed = new Discord.MessageEmbed()
				.setTitle(`You\'re on FSD now, **${message.author.username}**.`)
				.attachFiles([attachment])
				.setImage('attachment://cone.png');
		message.channel.send({embed});
	},
};