# Mixer Client [![CircleCI](https://circleci.com/gh/ConnorMcF/mixerclient.svg?style=svg)](https://circleci.com/gh/ConnorMcF/mixerclient) [![Coverage Status](https://coveralls.io/repos/github/ConnorMcF/mixerclient/badge.svg?branch=master)](https://coveralls.io/github/ConnorMcF/mixerclient?branch=master)

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
No token? Go to https://connormcf.com/mixeroauth/.

Further documentation can be found in the [documentation directory](https://github.com/ConnorMcF/mixerclient/tree/master/docs) in the repo.

License
----

MIT