const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battery')
		.setDescription('Helpful links to battery health information.'),
	async execute(interaction) {
        const embed = new Discord.MessageEmbed()
                .setTitle(`Here are some helpful links about battery health.`)
                .setDescription('https://www.geotab.com/blog/ev-battery-health/');
		await interaction.send({embeds: [embed]});
	},
};