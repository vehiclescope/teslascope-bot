const { SlashCommandBuilder, EmbedBuilder, Discord, AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fsd')
		.setDescription('You\'re on FSD now, friend.'),
	async execute(interaction) {
        const file = new AttachmentBuilder('./cone.png');
		const embed = new EmbedBuilder()
				.setTitle(`You\'re on FSD now, **${interaction.user.username}**.`)
				.setImage('attachment://cone.png');
		await interaction.reply({ embeds: [embed], files: [file]});
	},
};