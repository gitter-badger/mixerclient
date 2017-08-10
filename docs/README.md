# Mixer Client

## [Mixer](https://github.com/ConnorMcF/mixerclient/blob/master/docs/mixer.md)
```js
let Mixer = require('mixerclient')
let mixer = new Mixer('MIXER_TOKEN_HERE')
```

## [Channel](https://github.com/ConnorMcF/mixerclient/blob/master/docs/channel.md)
```js
mixer.join()
    .then(channel => {
        channel.on('ready', () => {
            channel.send('Hello world!')
        })
    })
```

## [User](https://github.com/ConnorMcF/mixerclient/blob/master/docs/user.md)
```js
channel.on('message', msg => {
	let user = msg.user
	console.log(user.name)
})
```

## [Message](https://github.com/ConnorMcF/mixerclient/blob/master/docs/message.md)
```js
channel.on('message', msg => {
	console.log(msg.user.name, msg.content)
})
```

## [Vote](https://github.com/ConnorMcF/mixerclient/blob/master/docs/vote.md)
```js
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
```