let chai = require('chai')
chai.should()

describe('Channel', () => {

	channel = null
	message = null
	user = null

	it('should join channel', (done) => {

		mixer.join()
			.then(ch => {
				channel = ch;
				done()
			})
			.catch(err => {
				console.log('ERRRRRR', err)
			})

	})

	it('should start a giveaway', (done) => {

		channel.giveaway()
			.then(resp => {
				done()
			})
			.catch(resp => {
				resp.should.eq('There\'s no one in your chat to win the giveaway!')
				done()
			})

	})

	it('should ping', (done) => {

		channel.ping()
			.then(resp => {
				done()
			})

	})

})

/* NEXT: message */