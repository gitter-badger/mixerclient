# Mixer Client [![CircleCI](https://img.shields.io/circleci/project/github/ConnorMcF/mixerclient.svg)](https://circleci.com/gh/ConnorMcF/mixerclient) [![Coveralls](https://img.shields.io/coveralls/ConnorMcF/mixerclient.svg)](https://coveralls.io/github/ConnorMcF/mixerclient?branch=master) [![Join the chat at https://gitter.im/ConnorMcF/mixerclient](https://badges.gitter.im/ConnorMcF/mixerclient.svg)](https://gitter.im/ConnorMcF/mixerclient?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
