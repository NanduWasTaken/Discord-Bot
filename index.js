const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
const colour = require('colour');
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const DB_URL = process.env.DataBaseURL
const data = mongoose.connection;
//-----end of const-----//

let bot = new Client({      
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}help`,
      type: 'LISTENING'
    }
  }
});

//Mongoose connecting//
mongoose.connect(DB_URL,
  {
    useNewUrlParser: true,
    
    useUnifiedTopology: true
  }
);


data.on("error", console.error.bind(console, 'connection error: '.red));
data.once("open", function () {
      console.log(`Connected To MongoDB DataBase`.green)



  
});













bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`.green));

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0)
          message.channel.send(args.join(' '));
        else
          message.reply('You did not send a message to repeat, cancelling command.')
        break

      /* Unless you know what you're doing, don't change this command. */
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('RANDOM')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

bot.on('message', message => {
    if (message.content === '<@932933211892383795>') {
        message.channel.send('Hello I Am Automate Nice To Meet You <@' + message.author.id + '>');
    }
});

const Guilds = bot.guild;
bot.on('message', message => {
    if (message.content === '<@886478645189824552>') {
        message.channel.send('Hy This Is Bumper He Dedicated His Life Bumping This Server | Contact @Nandu#7599 If Your Want This On Your Server ');
    }
});

bot.on('message', message => {
    if (message.content.startsWith('!status')) {
        const prefix = '!';
        const args = message.content.slice(prefix.length).trim().split(' ');
        if(message.author.id === "852381000528"){
            //args[0] is the command itself
            const activity = args[1];
            client.user.setActivity(activity);
        }
        else {
            message.channel.send('Your not the Premium user of the bot!')
        }
    }
});




const web = require('./server')

bot.login(config.token);