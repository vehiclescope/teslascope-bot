const getJSON = require('get-json');
const Discord = require('discord.js');

module.exports = {
	name: 'vehicle',
    description: 'Request information about a specific vehicle on Teslascope.',
    args: true,
    usage: '<public id>',
    cooldown: 5,
	execute(message, args) {
        getJSON('https://teslascope.com/api/vehicle/' + args[0])
            .then(function(response) {
                console.log(response);
                if(response.code == 404) {
                    message.reply('The vehicle you requested could not be found. Check to make sure the **public ID** you provided is valid and the vehicle is public.');
                } else {
                    const exampleEmbed = new Discord.RichEmbed()
                    .setColor('#FF6969')
                    .setTitle(response.response.name)
                    .setURL('https://teslascope.com/vehicle/' + response.response.public_id)
                    .setAuthor('Teslascope', 'https://teslascope.com/img/logoblock.png', 'https://teslascope.com/')
                    .setDescription('A glimpse of the vehicle information for **' + response.response.name + '**.')
                    .setImage(response.response.render_url)
                    .addField('Model', response.response.model + ' ' + response.response.trim + ' (' + response.response.year + ')', true)
                    .addBlankField(true)
                    .addField('Software Update', '[' + response.response.car_version + '](https://teslascope.com/software/' + response.response.car_version + ')', true)
                    .addField('Odometer', response.response.odometer.toLocaleString() + ' miles', true)
                    .addBlankField(true)
                    .addField('Battery Range', response.response.battery.level + '% (' + response.response.battery.range + ' miles)', true);

                    message.channel.send(exampleEmbed);
                }
            }).catch(function(error) {
                console.log(error);
        });
	},
};