let chai = require('chai')
chai.should()

describe('Setup', () => {

	let Mixer = require('../index')
	mixer = null

	it('should fail to ready - bad token', (done) => {

		mixer = new Mixer('FAKE')

		mixer.on('error', err => {
			done()
		})

		mixer.init()
			.catch(err => {
				// throws
			})

	})

	it('should ready', (done) => {

		mixer = new Mixer(process.env.MIXER_TOKEN)

		mixer.on('ready', () => {
			done()
		})

		mixer.init()

	})

})

/* NEXT: channel */