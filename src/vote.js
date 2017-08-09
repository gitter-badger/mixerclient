const User = require('./user')

let Vote = function(data, channel) {
	let self = this

    this.question = data.q
    this.answers = data.answers

    this.author = new User(data.author, channel)

    this.active = true;
    this.start = new Date()
    this.end = new Date(Date.now() + data.duration)
    this.duration = data.duration
    this.remaining = this.duration

    this.voters = data.voters
    this.responses = data.responses
    
    this.channel = channel

    this.vote = async (choice) => {
        choice = this.answers.indexOf(choice)
        return self.channel.socket.call('vote:choose', [choice])
    }

}

require('util').inherits(Vote, require('events').EventEmitter)

module.exports = Vote