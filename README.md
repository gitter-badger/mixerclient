# Mixer Client

Mixer Client is a friendly way to interact with the Mixer API.

### Installation

```sh
$ npm install mixerclient -S
```

### Usage
```js
let Mixer = require('mixerclient')
let mixer = new Mixer('MIXER_TOKEN_HERE')

mixer.on('ready', async () => {
	let channel = await mixer.join()
	channel.on('message', msg => {
	    if(msg.content == 'ping') {
	        msg.reply('pong!')
        }
    })
})
```
Further documentation can be found in the docs directory.

License
----

MIT