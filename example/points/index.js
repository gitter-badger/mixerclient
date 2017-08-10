let Mixer = require('../../index')
let mixer = new Mixer(process.env.MIXER_TOKEN || 'MIXER_TOKEN_HERE')

let points = {}

// when mixer client is ready
mixer.on('ready', async () => {
	
	// join the channel
	let channel = await mixer.join()

	// when channel is ready
	channel.on('ready', () => {
		// log it to the console
		console.log('Ready!')
	})

	// when a message is sent
	channel.on('message', msg => {
		// check if user exists in points object
		if(!points[msg.user.name]) {
			// add user to points object and start with 0
			points[msg.user.name] = 0;
		}

		// increment user points
		points[msg.user.name]++
	})

	// when a message is sent
	channel.on('message', msg => {
		// check if message is asking for amount of points
		if(msg.content.startsWith('!points')) {
			// fetch amount of points user has
			let amount = points[msg.user.name]

			// reply to the message and mention the user
			msg.reply('You have ' + amount + ' points!', true)
		}
	})

	// when an error occours
	channel.on('error', err => {
		// log it to the console
		console.error('Error: ', err)
	})


})


mixer.init()