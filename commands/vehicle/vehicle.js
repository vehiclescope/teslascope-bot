const getJSON = require('get-json');
const { SlashCommandBuilder, Discord, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vehicle')
		.setDescription('Displays vehicle information from Teslascope.')
        .addStringOption(option => option.setName('public_id').setDescription('The Public ID of the vehicle (found in vehicle settings).').setRequired(true)),
	async execute(interaction) {
        const publicID = interaction.options.getString('public_id');

        getJSON('https://teslascope.com/api/vehicle/' + publicID)
            .then(function(response) {
                console.log(response);
                if(response.code == 404) {
                    interaction.reply({ content: 'The vehicle you requested could not be found.'});
                } else {
                    response = response.response;

                    const exampleEmbed = new EmbedBuilder()
                    .setColor('#FF6969')
                    .setTitle(response.name)
                    .setURL('https://teslascope.com/vehicle/' + response.public_id)
                    .setDescription('A glimpse of the vehicle information for **' + response.name + '**.')
                    .setImage(response.render_url)
                    .addFields(
                        { name: 'Model', value: response.model + ' ' + response.trim + ' (' + response.year + ')', inline: true },
                        { name: 'Software Update', value: '[' + response.car_version + '](https://teslascope.com/software/' + response.car_version + ')', inline: true },
                        { name: "** **", value: "** **", inline: true },
                        { name: 'Odometer', value: response.odometer.toLocaleString() + ' miles', inline: true },
                        { name: 'Battery Range', value: response.battery.level + '% (' + response.battery.range + ' miles)', inline: true },
                        { name: "** **", value: "** **", inline: true },
                        { name: 'Driving (' + response.statistics.drives + ' sessions)', value: response.statistics.distance + ' miles driven', inline: true },
                        { name: 'Charging (' + response.statistics.charges + ' sessions)', value: response.statistics.charges_kwh + 'kWh generated', inline: true },
                        { name: "** **", value: "** **", inline: true }
                    );

                    interaction.reply({embeds: [exampleEmbed]});
                }
            }).catch(function(error) {
                console.log(error);
        });
	},
};