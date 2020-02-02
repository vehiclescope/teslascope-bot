const getJSON = require('get-json');

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
                    message.channel.send('There are **'+ response.response.count +' vehicles** ('+ response.response.percentage +'%) on the update, ' + response.response.version + '. \n' +
                    'This update was first spotted ' + timeDifference(new Date(), new Date(response.response.firstSpotted)) + '. \n \n' +
                    'Check out the release notes here: https://teslascope.com/teslapedia/software-update/' + response.response.version.replace(' ', '-')
                    );
                }
            }).catch(function(error) {
                console.log(error);
        });
	},
};