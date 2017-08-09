let chai = require('chai')
chai.should()

describe('User', () => {

	it('should whisper to a message', (done) => {

		message.whisper('shhhhh')
			.then(msg => {
				msg.text.should.eq('shhhhh')
				done()
			})

	}).timeout(5000)

	it('should whisper to a user', (done) => {

		setTimeout(() => {
			user.whisper('shhhhh!')
				.then(msg => {
					msg.text.should.eq('shhhhh!')
					done()
				})
		}, 1000)

	}).timeout(5000)

	it('should purge a user', (done) => {

		user.purge(10)
			.then(msg => {
				// can't purge yourself
			})
			.catch(err => {
				err.should.be.eq('You can\'t purge yourself!')
				done()
			})

	})

	it('should timeout a user', (done) => {

		user.timeout(10)
			.then(msg => {
				// can't timeout yourself
			})
			.catch(err => {
				err.should.be.eq('You can\'t time out yourself!')
				done()
			})

	})

	it('should delete a message', (done) => {

		message.delete()
			.then(msg => {
				done()
			})

	})

})

/* NEXT: vote */