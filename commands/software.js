const getJSON = require('get-json');
const Discord = require('discord.js');

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
    name: 'software',
    aliases: ['update', 'firmware', 'latest'],
    description: 'Request a specific software update.',
    args: false,
    usage: '<version>',
	execute(message, args) {

        if(args[0] === undefined) {
            args[0] = 'latest';
        }

        getJSON('https://teslascope.com/api/software/' + args[0])
            .then(function(response) {
                console.log(response);
                if(response.code == 404) {
                    message.reply('The version you requested could not be found.');
                } else {
                    response = response.response;
                    features = '';

                    if(response.features.length !== 0) {
                        features = '\r\n\r\n' + response.features.join('\r\n');
                    }

                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FF6969')
                    .setTitle('Software Update ('+response.version+')')
                    .setURL('https://teslascope.com/software/' + response.version)
                    .setDescription(
                        'A collection of information and metrics regarding the software update, **' + response.version + '**.' +
                        features
                        + '\r\n\r\nTo view the complete release notes **[click here](https://teslascope.com/software/' + response.version + ')**.'
                        + '\r\nTo view this update\'s rollout **[click here](https://teslascope.com/software/history?version=' + response.version + ')**.'
                    )
                    .addField('Commit', response.commit, true)
                    .addField('Vehicles', response.count.toLocaleString() + ' (' + response.percentage + '%)', true)
                    .addField('First Spotted', timeDifference(new Date(), new Date(response.firstSpotted)), true)
                    .addField('Downloading', response.pending.downloading, true)
                    .addField('Waiting For Wifi', response.pending.waiting, true)
                    .addField('Available / Installing', response.pending.available + ' / ' + response.pending.installing, true);

                    message.channel.send(exampleEmbed);
                }
            }).catch(function(error) {
                console.log(error);
        });
	},
};