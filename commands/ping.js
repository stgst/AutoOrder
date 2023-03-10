const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('test command'),
    async execute(interaction){
        return interaction.reply('Pong!')
    }
}