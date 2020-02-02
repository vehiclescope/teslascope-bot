const getJSON = require('get-json');

module.exports = {
	name: 'latest',
	description: 'Request the latest software update.',
	execute(message, args) {
        getJSON('https://teslascope.com/api/software/latest')
            .then(function(response) {
                message.channel.send('The latest software update for Tesla vehicles is **' + response.response + '**. \n' +
                    'Check out the release notes here: https://teslascope.com/teslapedia/software-update/' + response.response.replace(' ', '-')
                );
            }).catch(function(error) {
                console.log(error);
        });
	},
};