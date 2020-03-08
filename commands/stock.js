const getJSON = require('get-json');
const Discord = require('discord.js');

const { stockapi } = require('./../config.json');

module.exports = {
	name: 'stock',
    aliases: ['tsla'],
    description: 'Request the current stock price of Tesla ($TSLA).',
    cooldown: 10,
	execute(message, args) {
	    if(!stockapi) {
	        message.reply('An API key for stock prices has not been included in the config file. Please kindly let a moderator know.');
        } else {
	        getJSON('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=' + stockapi)
                .then(function(response) {
                    console.log(response);
                    const info = response['Global Quote'];
                    const exampleEmbed = new Discord.RichEmbed()
                    .setColor('#FF6969')
                    .setTitle('Tesla, Inc. (TSLA)')
                    .setDescription('A glimpse of stock information for **Tesla, Inc.**.')
                    .addField('Price', '**$' + parseFloat(info['05. price']).toFixed(2) + '**', true)
                    .addBlankField(true)
                    .addField('Open', '$' + parseFloat(info['02. open']).toFixed(2), true)
                    .addField('High', '$' + parseFloat(info['03. high']).toFixed(2), true)
                    .addField('Low', '$' + parseFloat(info['04. low']).toFixed(2), true)
                    .addField('Change', parseFloat(info['10. change percent']).toFixed(2) + ' ($' + parseFloat(info['09. change']).toFixed(2) + ')', true);

                    message.channel.send(exampleEmbed);
                }).catch(function(error) {
                    console.log(error);
            });
        }
	},
};