const BeamClient = require('beam-client-node')

const Channel = require('./channel')

/**
 * Mixer API client.
 * @constructor
 * @param {string} token - Your Mixer API token.
 */

let Mixer = function(token) {
	/**
	 * @constructor
	 * @lends Mixer
	 */
	let self = this

	self.client = new BeamClient()
	self.client.use('oauth', {
		tokens: {
			access: token,
			expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
		},
	})

	self.user = null

	/**
	 * Fetches client information and stores it.
	 * @returns {promise}
	 */
	this.fetchInfo = async () => {
		return self.client.request('GET', 'users/current')
			.then(response => {
				if(response.body.error) {
					self.emit('error', 'Invalid token')
					return Promise.reject('Invalid token')
				}

				self.user = response.body
				self.emit('ready')
				return self.user
			})
			.catch(err => Promise.reject(err))
	}

	/**
	 * Initalises Mixer class and calls fetchInfo
	 * @returns {promise}
	 */
	self.init = async () => {
		await self.fetchInfo()
		return
	}

	self.join = async (user = 'current') => {

		let channelID = null;

		return self.client.request('GET', 'users/' + user)
			.then(response => {
				channelID = response.body.channel.id;
				return self.client.chat.join(response.body.channel.id)
			})
			.then(response => {
			    const body = response.body

			    //let channel = 

			    return new Channel(self.user.id, channelID, body.endpoints, body.authkey)
			})
	} 


}

require('util').inherits(Mixer, require('events').EventEmitter)

module.exports = Mixer