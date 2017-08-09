# User

```js
channel.on('message', msg => {
	let user = msg.user
	console.log(user.name)
})
```

# Properties

### .name
`String` - Username

### .mention
`String` - Username with `@` prepended

### .id
`String` - User ID

### .roles
`Array` - Roles

### .level
`Integer` - Mixer level

### .channel
`Channel` - Parent channel from user data

# Methods

### .whisper(message)
Sends a whisper to the user.
- `message` - `String` - Whisper message

Returns `Promise`
- `Message` - Message instance

### .timeout(duration)
Deletes the message from the chat.
- `duration` - `Integer` - Timeout duration in seconds

Returns `Promise`
- `String` - Successful timeout, follows format `username has been timed out for 30s.`

### .purge()
Purge users messages.

Returns `Promise`