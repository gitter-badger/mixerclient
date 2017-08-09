const BeamSocket = require('beam-client-node/lib/ws')

const User = require('./user')
const Message = require('./message')
const Vote = require('./vote')

let Channel = function(userID, channelID, endpoints, authkey) {
	let self = this

	this.id = channelID

	this.socket = new BeamSocket(endpoints).boot()

	this.vote = null;

	this.auth = async () => {
		await this.socket.auth(channelID, userID, authkey)
		self.emit('ready')
	}
	this.auth()

	this.send = async (msg) => {
		return new Message(await self.socket.call('msg', [msg]), self)
	}

	this.startVote = async (vote) => {
		return self.socket.call('vote:start', [
			vote.name,
			vote.choices,
			vote.duration
		])
	}

	this.clear = async () => {
		return self.socket.call('clearMessages', [])
	}

	this.giveaway = async () => {
		return self.socket.call('giveaway:start', [])
	}

	this.ping = async () => {
		return self.socket.call('ping', [])
	}

	this.socket.on('UserJoin', data => {
		let user = new User(data, self)
		self.emit('join', user)
	})

	this.socket.on('UserLeave', data => {
		let user = new User(data, self)
		self.emit('leave', user)
	})

	this.socket.on('ChatMessage', data => {
		let msg = new Message(data, self)
		self.emit('message', msg)
	})

	this.socket.on('PollStart', data => {
		if(!self.vote || !self.vote.active) {
			self.vote = new Vote(data, self)
			self.emit('vote', self.vote)
			return
		}

		if(!self.vote) { return; }

		self.vote.voters = data.voters
		self.vote.responses = data.responses
		self.vote.remaining = self.vote.end - Date.now()
		self.vote.emit('update')
	})

	this.socket.on('PollEnd', data => {
		if(!self.vote) { return; }
		self.vote.active = false;
		self.vote.emit('done', self.vote)
	})

	this.socket.on('DeleteMessage', data => {
		let user = new User(data.moderator, self)
		self.emit('delete', user)
	})

	this.socket.on('PurgeMessage', data => {
		let user = new User(data.moderator, self)
		self.emit('purge', user)
	})

	this.socket.on('ClearMessages', data => {
		let user = new User(data.moderator, self)
		self.emit('clear', user)
	})

	this.socket.on('UserUpdate', data => {
		let user = new User(data, self)
		self.emit('update', user)
	})

	/*this.socket.on('UserTimeout', data => {
		let user = new User(data, self)
		self.emit('timeout', {
			user,
			duration: data.duration
		})
	})*/

	this.socket.on('error', err => {
		self.emit('error', err)
	})

	

}

require('util').inherits(Channel, require('events').EventEmitter)

module.exports = Channel