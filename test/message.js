let chai = require('chai')
chai.should()

describe('Message', () => {

	it('should send a message', (done) => {

		let active = true

		channel.send('should send a message')
			.then(msg => {
				if(!active) { return }

				msg.text.should.eq('should send a message')

				active = false
				done()
			})

	})

	it('should recieve a message', (done) => {

		let active = true

		setTimeout(() => {
			channel.send('should recieve a message')

			channel.on('message', msg => {
				if(!active) { return }

				msg.text.should.eq('should recieve a message')
				message = msg

				active = false
				done()
			})
		}, 1000)

	}).timeout(5000)

	it('should reply to a message', (done) => {

		let active = true

		setTimeout(() => {
			message.reply('it does reply to a message')
				.then(msg => {
					if(!active) { return }

					msg.text.should.eq('it does reply to a message')
					message = msg
					user = msg.user

					active = false
					done()
				})
		}, 1000)

	}).timeout(5000)

	it('should mention reply to a message', (done) => {

		let active = true

		setTimeout(() => {
			message.reply('it does mention reply to a message', true)
				.then(msg => {
					if(!active) { return }

					msg.content.should.eq('@' + mixer.user.username + ' it does mention reply to a message')
					message = msg
					user = msg.user

					active = false
					done()
				})
		}, 1000)

	}).timeout(5000)

})

/* NEXT: user */