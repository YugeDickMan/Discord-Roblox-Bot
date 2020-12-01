// Important Packages
const noblox = require('noblox.js');
const discord = require('discord.js');
const WOKC = require('wokcommands');
require('dotenv').config();


// Configuration
const token = process.env.TOKEN;
const cookie = process.env.COOKIE;

const client = new discord.Client();


// Ready Code
client.on('ready', async () => {
    new WOKC(client, 'commands')
    // You can set the prefix to whatever or use MongoDB, look at the wokcommands docs to know what to do.
        .setDefaultPrefix('?')
    // You can set the category to whatever you want and you can add more, look at the wokcommands docs to know what to do.
        .setCategoryEmoji('Misc', '🛎️')
        .setCategoryEmoji('Roblox', '⌚')
        .setCategoryEmoji('Moderation', '👮');
    
    // Set the Roblox cookie!
    await noblox.setCookie(cookie)
    .then(() => {
      console.log('\x1b[32mLogged into Roblox!\x1b[0m');
    })
    .catch(err => {
      console.log('\x1b[31mWhoops! An error has occured while trying to log into Roblox! ' + err + '\x1b[0m');
    });
});

// Login to Discord!
client.login(token);