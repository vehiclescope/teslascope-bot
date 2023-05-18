const getJSON = require('get-json');
const { SlashCommandBuilder, Discord, EmbedBuilder } = require('discord.js');

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('software')
		.setDescription('Request a specific software update.')
        .addStringOption(option => option.setName('software').setDescription('The software version.').setRequired(true), option => option.setName('model').setDescription('Only include if you want results just for that model type.').addChoices(
            {name: 'Model S', value: 'models'},
            {name: 'Model 3', value: 'model3'},
            {name: 'Model X', value: 'modelx'},
            {name: 'Model Y', value: 'model'},
        )),
	async execute(interaction) {
        const softwareString = interaction.options.getString('software') ?? 'latest';
        const model = interaction.options.getString('model') ?? null;

        let apiUrl;
        if (model) {
            apiUrl = 'https://teslascope.com/api/software/'+ softwareString +'?model=' + model;
        } else {
            apiUrl = 'https://teslascope.com/api/software/' + softwareString;
        }

        getJSON(apiUrl)
            .then(function(response) {
                console.log(response);
                if(response.code == 404) {
                    interaction.reply({ content: 'The version you requested could not be found.'});
                } else {
                    response = response.response;
                    features = '';

                    if(response.features.length !== 0) {
                        features = '\r\n\r\n' + response.features.join('\r\n');
                    }

                    const exampleEmbed = new EmbedBuilder()
                    .setColor('#FF6969')
                    .setTitle('Software Update ('+response.version+')')
                    .setURL('https://teslascope.com/software/' + response.version)
                    .setDescription(
                        'This software update, **' + response.version + '**, was first spotted ' + timeDifference(new Date(), new Date(response.firstSpotted)) + '.'
                        + features
                        + '\r\n\r\nTo view details **[click here](https://teslascope.com/software/' + response.version + ')**.'
                        + '\r\nTo view this update\'s rollout **[click here](https://teslascope.com/software/history?version=' + response.version + ')**.'
                    )
                    .addFields(
                        { name: 'Commit', value: response.commit.toString(), inline: true },
                        { name: 'Vehicles', value: response.count.toLocaleString() + ' (' + response.percentage + '%)', inline: true},
                        { name: 'Downloading', value: response.pending.downloading.toString(), inline: true },
                        { name: 'Waiting For Wifi', value: response.pending.waiting.toString(), inline: true},
                        { name: 'Available / Installing', value: response.pending.available.toString() + ' / ' + response.pending.installing.toString(), inline: true}
                    );

                    interaction.reply({embeds: [exampleEmbed]});
                }
            }).catch(function(error) {
                console.log(error);
        });
	},
};