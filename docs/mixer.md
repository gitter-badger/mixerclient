# Mixer

```js
let Mixer = require('mixerclient')
let mixer = new Mixer('MIXER_TOKEN_HERE')
```

# Properties

### .client
`BeamClient` - Beam API client.

### .user
`null` or `Object` - User info object directly from the Mixer API.

# Methods

### Constructor(token)
Creates new Mixer client
- `token` - `String` - Mixer OAuth token

Returns `Mixer`

### .init()
Fetches user auth info for joining channel then emits event `ready`.
Returns `Promise`

### .join(channel)
Joins stream
- `channel` - *Optional* - Username of channel to join, defaults to self

Returns `Promise`
- `Channel` - Channel instance

### .fetchInfo()
Fetches user info and sets to `user` property.

Returns `Promise`
- `Object` - User info object directly from the Mixer API.

# Events

### ready
Emitted when client is ready to join a channel.