module.exports = {
    name: "ready",
    once: true,
    execute(client){
        return console.log(`Logged in ${client.user.tag}`)
    }
}