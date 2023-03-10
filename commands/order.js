const { EmbedBuilder, SlashCommandBuilder, CommandInteraction, messageLink, PermissionFlagsBits } = require('discord.js')
const { merchant, hashiv, hashkey } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('order')
    .setDescription('創建訂單')
    .addUserOption(option =>
        option.setName('paid_user')
        .setDescription('付款人')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('email')
        .setDescription('付款人電子郵件')
        .setRequired(true))
    .addIntegerOption(option =>
        option.setName('amt')
        .setDescription('付款金額')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('remark')
        .setDescription('訂單備註')
        .setRequired(true))
    .setDefaultMemberPermissions(0),
    /**
    * @param { CommandInteraction } interaction
    */
    async execute(interaction){
        const email = interaction.options.getString('email');
        const amt = interaction.options.getInteger('amt');
        const remark = interaction.options.getString('remark');
        const paid_user = interaction.options.getUser('paid_user');

        var axios = require('axios')
        var url = require('url')

        var payload = { MerchantID: merchant, HashIV: hashiv, HashKey: hashkey, amount: amt, itemname: "Dusts 自訂商品", remark: remark, email: email, NotifyURL: "https://xiung.xyz/xiungnewebpay.php"};
        
        const params = new url.URLSearchParams(payload)

        interaction.reply('系統背景執行中．．．').then(async () => {
            var msg = await interaction.fetchReply()
            var res = await axios.get(`http://139.162.87.237:9487/newebpay?${params}`)
        
            const orderID = res.data.orderID
            const CodeNo = res.data.CodeNo
            const ExpireDate = res.data.ExpireDate
    
            const embed = new EmbedBuilder()
            .setTitle(`繳費資訊`)
            .addFields(
                {name: "付款人", value: `<@${paid_user.id}>`},
                {name: "訂單編號", value: `${orderID}`},
                {name: "超商繳費代碼", value: `${CodeNo}`},
                {name: "繳費逾期日", value: `${ExpireDate}`})
            .setColor("#303136")
            
            await interaction.guild.channels.cache.get('1010081121800818768').send({embeds: [embed]})
            await paid_user.send({content: "以下為你的繳費資訊", embeds: [embed]})
            return msg.edit({content: "繳費資訊", embeds: [embed]})
        })

    }
}