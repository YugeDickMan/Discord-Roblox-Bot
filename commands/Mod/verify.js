// Important Packages
const noblox = require('noblox.js');
const {
    MessageEmbed
} = require('discord.js');


// Main Code
module.exports = {
    // The command min param.
    minArgs: 1,
    // The command max param.
    maxArgs: 1,
    // The command syntax error.
    syntaxError: 'Incorrect syntax! Use `verify <Roblox ID>`.',
    // The command name.
    name: 'verify',
    // The command desc.
    description: 'Starts a verification process that verifies you and give you a role in Discord.',
    // The command category.
    category: 'Moderation',
    // Callback.
    callback: async (message, args) => {
        let user = args[0];
        let randomString = generateString();
        // You must edit this to the role ID that you want the verified user to have or this will not work!
        let roleID = 'Role ID Here';

        function generateString() {
            let randomString = ['Immolate Like Submit Promise Grinder', 'Overtake Grinning Wool Anteater Pigeon', 'Blockhead Vanish Indecent Gaudy Vie', 'Became Waste Disaster Helpless Carver'];
            let index = Math.floor(Math.random() * randomString.length);

            return randomString[index];
        };

        const initializeVerificationEmbed = new MessageEmbed()
            .setTitle('Verification')
            .setDescription('Please put this text into your status to verify that this account is yours: **' + randomString + '**')
            .setFooter('This will be cancelled in 2 minutes! Type `cancel` to cancel or `done` when you\'re done.');
        message.channel.send(initializeVerificationEmbed).then(() => {
            let filter = m => m.author.id === message.author.id;

            message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 120000,
                    errors: ['time']
                })
                .then(async collectedMessages => {
                    if (collectedMessages.first().content.toString() !== 'cancel' || 'Cancel' || 'done' || 'Done') {
                        return message.reply('this has been cancelled because you did not reply with cancel or done!');
                    };

                    if (collectedMessages.first().content.toString() === 'cancel' || 'Cancel') {
                        return message.reply('this has been cancelled!');
                    };

                    if (collectedMessages.first().content.toString() === 'done' || 'Done') {
                        await noblox.getStatus(user)
                            .then(data => {
                                if (data !== randomString) {
                                    const notSameStringEmbed = new MessageEmbed()
                                        .setColor('#FF0000')
                                        .setTitle('Invalid Status!')
                                        .setDescription('The status that is in your status is not the same as the one that I have sent.');
                                    return message.channel.send(notSameStringEmbed);
                                } else if (data === randomString) {
                                    const notSameStringEmbed = new MessageEmbed()
                                        .setColor('#008000')
                                        .setTitle('Verification Success!')
                                        .setDescription('You have succesfully verified!');
                                    message.channel.send(notSameStringEmbed).then(() => {
                                        message.member.roles.add(roleID);
                                        return;
                                    });
                                };
                            })
                            .catch(err => {
                                const errEmbed = new MessageEmbed()
                                    .setColor('#FF0000')
                                    .setTitle('Error!')
                                    .setDescription('An error has occured while trying to get the Roblox user\'s status! ' + err);
                                return message.channel.send(errEmbed);
                            });
                    };
                })
                .catch(err => {
                    return message.reply('whoops! An error has occured. ' + err);
                });
        })
    },
};