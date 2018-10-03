// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`++help`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  



  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  



  if(command === "godsword") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  



  if(command === "kick") {
    if(!message.member.roles.some(r=>["HollyFather"].includes(r.name)) )
      return message.reply("Oopsie, looks like you are not holly enough");
    

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Not a valid sinner");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }



  //ban 
  if(command === "ban") {

    if(!message.member.roles.some(r=>["HollyFather", "Administrator"].includes(r.name)) )
      return message.reply("You are not holly enough!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Not a valid sinner, mention proper one");
    if(!member.bannable) 
      return message.reply("Seems like you cant use spells on this holly person");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }



  //delete messages
  if(command === "purify") {
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("You need to provide value between 2 and 100");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }


  if(command === "help") {
    let botembed = new Discord.RichEmbed()
    .setDescription("Jesus Bot")
    .setColor("#FE0000")
    .setThumbnail("http://www.equinoxpub.com/blog/wp-content/uploads/2013/04/Jesus-angry.jpg")
    .addField("Shuxprojects", "sys.root.shux@gmail.com")
    .addField("Version", "v0.2")
    .addField("Support group", "https://discord.gg/Wvuday5")
    .addBlankField()
    .addField("Fun", "hug, hack, godsword, ping")
    .addField("Moderation", "purify, kick, ban")
    return message.channel.send(botembed);
  }




  if (command === "hug") {
    let member = message.mentions.members.first()
    message.channel.send(`${message.author} gave ${member} a hug!`, {
      file: "https://media.giphy.com/media/CZpro4AZHs436/giphy.gif"
    }
    )}



    if(command == "warn") {
      let member = message.mentions.member.first();
      if(!member)
        return message.reply("Invalid member")

      message.channel.send(`${member} has been warned`) 
    }




  if(command === "hack") {
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Not a valid sinner, mention proper one");
    
    let botembed = new Discord.RichEmbed()
    .setDescription(`Hacking ${member.user.tag}`)
    return message.channel.send(botembed);
  }
});


client.login("NDk2MDcxMDkwNzgzOTExOTM2.DpWSMQ.8Ib9_XCzgaJ_IOCveiIDnK-B7gI");
