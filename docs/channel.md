# Channel

```js
mixer.join()
    .then(channel => {
        channel.on('ready', () => {
            channel.send('Hello world!')
        })
    })
```

# Properties

### .socket
`BeamClient` - Beam websocket API client.

### .id
`String` - Channel ID

### .vote
`null` or `Vote` - Current vote

# Methods

### .auth()
Authenticate user into channel and emit event `ready`. Called automatically on instance init.
Returns `Promise`

### .send(message)
Sends a message into the chat
- `message` - `String` - Chat message

Returns `Promise`
- `Message` - Message instance

### .startVote(vote)
Starts a vote.
- `vote` - `Object`
    - `name` - `String` - Name of vote
    - `choices` - `Array` - Vote choices
    - `duration` - `Integer` - Duration of vote in seconds

Returns `Promise`
- `String` - Started poll, content should equal `Poll started.`

### .clear()
Clears the chat

Returns `Promise`
- `String` - Cleared chat, content should equal `Messages cleared.`

### .giveaway()
Starts a giveaway

Returns `Promise`
- `String` - Started a giveaway, content should equal `Starting a giveaway`

### .ping()
Pings the socket

Returns `Promise`

# Events

### ready
Emitted when client is fully connected and authenticated to channel.

### join
Emitted when a user joins the stream.
- `User` - User who joined the stream

### leave
Emitted when a user leaves the stream.
- `User` - User who left the stream

### message
Emitted when a user sends a chat message.
- `Message` - Message posted in chat

### vote
Emitted when a vote is started.
- `Vote` - Newly started vote, same as property `.vote`

### delete
Emitted when a message is deleted by a moderator.
- `User` - Moderator who deleted message

### purge
Emitted when a user is purged by a moderator.
- `User` - Moderator who purged the user

### clear
Emitted when the chat is cleared by a moderator.
- `User` - Moderator who cleared the chat

### update
Emitted when a user is updated.
- `User` - User who was updated