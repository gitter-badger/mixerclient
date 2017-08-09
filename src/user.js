// const Message = require('./message')

let User = function(data, channel) {
	let self = this

	self.name = data.user_name
	self.mention = '@' + data.user_name

	self.id = data.user_id

	self.roles = data.user_roles || null

	self.level = data.user_level || null

	self.channel = channel

	self.whisper = async (msg) => {

		const Message = require('./message')
		// what is this doing down here?
		// if it's at the top it'll get stuck in a require loop with message
		// and you'll get `Uncaught TypeError: User is not a constructor`
		// but hey i suppose this works too

		return new Message(await self.channel.socket.call('whisper', [self.name, msg], self.channel))
	}

	self.timeout = async (duration) => {
		return self.channel.socket.call('timeout', [self.name, duration])
	}

	self.purge = async () => {
		return self.channel.socket.call('purge', [self.name])
	}

}

module.exports = User