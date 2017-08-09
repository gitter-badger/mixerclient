let chai = require('chai')
chai.should()

const showRc = true

describe('Poll', () => {

	it('should start a poll', (done) => {

		setTimeout(() => {
			let i = 0
			let countdown = 6000
			let active = true

			channel.startVote({
				name: 'Poll test',
				choices: ['Yes', 'No'],
				duration: 5
			})

			channel.on('vote', vote => {

				channel.vote.on('update', () => {
					if(!active) { return }

					i++

					channel.vote.remaining.should.be.below(countdown)
					countdown = channel.vote.remaining

					if(showRc) {
						console.log('      Recieved ' + i + ' at ' + countdown)
					}
				})

				channel.vote.on('done', () => {
					if(!active) { return }

					if(showRc) {
						console.log('      Done on ' + i + ' at '+ countdown)
					}
					i.should.be.above(5)

					channel.vote.active.should.eq(false)
					channel.vote.responses['Yes'].should.eq(0)
					channel.vote.responses['No'].should.eq(0)

					active = false
					done()
				})

			})
		}, 1000)

	}).timeout(7500)

	it('should vote on a poll', (done) => {

		let i = 0
		let countdown = 6000
		let active = true

		channel.startVote({
			name: 'Poll test',
			choices: ['Yes', 'No'],
			duration: 5
		})

		channel.on('vote', vote => {

			channel.vote.vote('No')

			channel.vote.on('update', () => {
				if(!active) { return }

				i++

				channel.vote.remaining.should.be.below(countdown)
				countdown = channel.vote.remaining

				if(showRc) {
					console.log('      Recieved ' + i + ' at ' + countdown)
				}
			})

			channel.vote.on('done', () => {
				if(!active) { return }

				if(showRc) {
					console.log('      Done on ' + i + ' at '+ countdown)
				}
				i.should.be.above(5)

				channel.vote.active.should.eq(false)
				channel.vote.responses['Yes'].should.eq(0)
				channel.vote.responses['No'].should.eq(1)
				
				active = false
				done()
			})

		})

	}).timeout(6500)


})

/* NEXT: misc */