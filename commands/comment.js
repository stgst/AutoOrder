const {SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle} = require('discord.js')

module.exports = SlashCommandBuilder()
    .setName("comment")
    .setDescription("評價")
    .