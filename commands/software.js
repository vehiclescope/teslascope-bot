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
    aliases: ['update', 'firmware'],
    description: 'Request a specific software update.',
    args: true,
    usage: '<version>',
	execute(message, args) {
        getJSON('https://teslascope.com/api/software/' + args[0])
            .then(function(response) {
                console.log(response);
                if(response.code == 404) {
                    message.reply('The version you requested could not be found.');
                } else {
                    const exampleEmbed = new Discord.RichEmbed()
                    .setColor('#FF6969')
                    .setTitle(response.response.version)
                    .setURL('https://teslascope.com/software/' + response.response.version)
                    .setDescription('A collection of statistics about the Tesla software update, **' + response.response.version + '**.')
                    .addField('Release Notes', '[View](https://teslascope.com/software/' + response.response.version + ')', true)
                    .addBlankField(true)
                    .addField('Commit', response.response.commit, true)
                    .addField('Vehicles', response.response.count.toLocaleString() + ' (' + response.response.percentage + '%)', true)
                    .addBlankField(true)
                    .addField('First Spotted', timeDifference(new Date(), new Date(response.response.firstSpotted)), true);

                    message.channel.send(exampleEmbed);
                }
            }).catch(function(error) {
                console.log(error);
        });
	},
};