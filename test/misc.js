let chai = require('chai')
chai.should()

describe('Misc', () => {



	it('should catch an error', (done) => {

		channel.on('error', (err) => {
			err.should.be.eq('test')
			done()
		})

		channel.socket.emit('error', 'test')

	})


})

/* LAST TEST */