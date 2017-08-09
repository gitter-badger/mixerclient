const User = require('./user')

let Message = function(data, channel) {
	let self = this

    this.id = data.id

    this.user = new User(data, channel)
    this.channel = channel

    this.content = data.message.message.map(msg => {
        return msg.text
    }).join('')

    this.text = data.message.message.map(msg => {
        msg = msg.type == 'text' ? msg.text : ''
        msg = msg.type == 'mention' ? msg.text : msg
        return msg
    }).join('')

	this.message = data.message.message

    this.isWhisper = data.message.meta.whisper ? true : false

    this.reply = async (msg, mention = false) => {
        if(mention) {
            msg = this.user.mention + ' ' + msg
        }
        msg = new Message(await this.channel.socket.call('msg', [msg]), this.channel)
        return msg
    }

    this.whisper = async (msg) => {
        return this.user.whisper(msg)
    }

    this.delete = async () => {
        let response = this.channel.socket.call('deleteMessage', [self.id])
        return response == 'Message deleted.'
    }

}

module.exports = Message