const getJSON = require('get-json');
const Discord = require('discord.js');

module.exports = {
	name: 'stock',
    aliases: ['tsla'],
    description: 'Request the current stock price of Tesla ($TSLA).',
    cooldown: 3,
    usage: '<symbol>',
	execute(message, args) {

	    // Let's check if a symbol was provided. If not, default to TSLA.
        if(args[0]) { stock = args[0]; }
        else { stock = 'TSLA'; }

        getJSON('https://financialmodelingprep.com/api/v3/quote/' + stock)
            .then(function(response) {
                console.log(response[0]);
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF6969')
                .setTitle(response[0].name + ' (' + response[0].symbol + ')')
                .setDescription('A glimpse of stock information for **' + response[0].name + '**.')
                .addField('Price', '**$' + parseFloat(response[0].price).toFixed(2) + '**', true)
                .addBlankField(true)
                .addField('Open', '$' + parseFloat(response[0].open).toFixed(2), true)
                .addField('High', '$' + parseFloat(response[0].dayHigh).toFixed(2), true)
                .addField('Low', '$' + parseFloat(response[0].dayLow).toFixed(2), true)
                .addField('Change', parseFloat(response[0].changesPercentage).toFixed(2) + '% ($' + parseFloat(response[0].change).toFixed(2) + ')', true);

                message.channel.send(exampleEmbed);
            }).catch(function(error) {
                console.log(error);
        });
	},
};