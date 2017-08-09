let Mixer = require('../../index')
let mixer = new Mixer('3tPhZcMZpjx7CQPQTOBkCp9Nn3tQpcO1mvw267j6ysbOy9kMsGuSU3hq30eAuPBI')

mixer.on('ready', async () => {

	console.log('mixer ready')
	
	let channel = await mixer.join()

	channel.on('ready', async () => {
		let msg = await channel.send('hello world!')
		console.log(mixer.user)
	})

	channel.on('message', msg => {
		console.log(msg.user.name, msg.content)
	})

	channel.on('message', msg => {
		if(msg.content.startsWith('!speak')) {
			msg.reply('hello there!', true)
		}

		if(msg.content.startsWith('!hello')) {
			msg.whisper('hello there!')
		}

		if(msg.content.startsWith('!giveaway')) {
			channel.send('ok starting giveaway!')
			channel.giveaway()
		}

		if(msg.content.startsWith('!vote')) {
			channel.send('ok starting a poll!')
			channel.startVote({
				name: 'Is this a great poll?',
				choices: ['Yes', 'No'],
				duration: 15
			})
		}
	})

	channel.on('vote', vote => {
		console.log('start', vote, channel.vote.remaining)

		vote.vote(vote.answers[0])

		vote.on('update', () => {
			console.log('update', channel.vote.responses, channel.vote.remaining)
		})
		
		vote.on('done', () => {
			console.log('done', channel.vote.responses, channel.vote.remaining)
		})
	})

	channel.on('delete', user => {
		console.log('delete', user)
	})

	channel.on('clear', user => {
		console.log('delete', user)
	})

	channel.on('update', user => {
		console.log('update', user)
	})

	channel.on('error', err => {
		console.log('error!', err)
	})


})


mixer.init()