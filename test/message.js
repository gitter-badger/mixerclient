let chai = require('chai')
chai.should()

describe('Message', () => {

	it('should send a message', (done) => {

		channel.send('should send a message')
			.then(msg => {
				msg.text.should.eq('should send a message')
				done()
			})

	})

	it('should recieve a message', (done) => {

		setTimeout(() => {
			channel.send('should recieve a message')

			channel.once('message', msg => {
				msg.text.should.eq('should recieve a message')
				message = msg

				done()
			})
		}, 1000)

	}).timeout(5000)

	it('should reply to a message', (done) => {

		setTimeout(() => {
			message.reply('it does reply to a message')
				.then(msg => {
					msg.text.should.eq('it does reply to a message')
					message = msg
					user = msg.user

					done()
				})
		}, 1000)

	}).timeout(5000)

	it('should mention reply to a message', (done) => {

		setTimeout(() => {
			message.reply('it does mention reply to a message', true)
				.then(msg => {
					msg.content.should.eq('@' + mixer.user.username + ' it does mention reply to a message')
					message = msg
					user = msg.user
					
					done()
				})
		}, 1000)

	}).timeout(5000)

})

/* NEXT: user */