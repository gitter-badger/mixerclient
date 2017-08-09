# Message

```js
channel.on('message', msg => {
	console.log(msg.user.name, msg.content)
})
```

# Properties

### .id
`String` - Message ID

### .user
`User` - Message author

### .content
`String` - Message text only

### .text
`String` - Message text with mentions

### .message
`Array` - Raw message array

### .isWhisper
`Boolean` - Is message a whisper

# Methods

### .reply(message, mention)
Sends a message into the chat
- `message` - `String` - Chat message
- `mention` - `Boolean` - Append mention before message with space

Returns `Promise`
- `Message` - Message instance

### .whisper(message)
Sends a whisper to the message author
- `message` - `String` - Whisper message

Returns `Promise`
- `Message` - Message instance

### .delete()
Deletes the message from the chat

Returns `Promise`
- `boolean` - Message deleted

