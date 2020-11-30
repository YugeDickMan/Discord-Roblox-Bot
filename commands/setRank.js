// Important Packages
const {
    MessageEmbed
} = require('discord.js');
const noblox = require('noblox.js');

// Main Code
module.exports = {
    // The command min param.
    minArgs: 3,
    // The command max param.
    maxArgs: 3,
    // The command syntax error.
    syntaxError: 'Incorrect syntax! Use `setrank <Group ID> <User ID> <Rank ID>`.',
    // The command name.
    name: 'setrank',
    // The command desc.
    description: 'Sets the specified Roblox user\'s rank in a Roblox group.',
    // The command category.
    category: 'Roblox',
    // Callback.
    callback: async (message, args) => {
        let group = args[0];
        let user = args[1];
        let rank = args[2];

        await noblox.setRank({
                group: group,
                target: user,
                rank: rank,
            })
            .then(() => {
                const setRankDoneEmbed = new MessageEmbed()
                    .setColor('#008000')
                    .setTitle('Success!')
                    .setDescription('Successfully set **' + user + '\'s** rank to **' + rank + '** in **' + group + '**');
                message.channel.send(setRankDoneEmbed);
            })
            .catch(err => {
                const errEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error!')
                    .setDescription('An error has occured while trying to set the user\'s rank in the group! ' + err);
                message.channel.send(errEmbed);
            });
    },
};