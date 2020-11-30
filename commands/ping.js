// Important Packages
const {
    MessageEmbed
} = require('discord.js');


// Main Code
module.exports = {
    // The command max param.
    maxArgs: 0,
    // The command syntax error.
    syntaxError: 'Incorrect syntax! Use `ping`.',
    // The command name.
    name: 'ping',
    // The command desc.
    description: 'Checks the Discord-Roblox\'s ping.',
    // The command category.
    category: 'Misc',
    // Callback.
    callback: (message) => {
        const pingEmbed = new MessageEmbed()
            .setColor('#008000')
            .setTitle('Pong!')
            .setDescription('The Discord-Roblox\'s ping is `' + message.client.ws.ping + 'ms`.');
        message.channel.send(pingEmbed);
    },
};