# Vote

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

# Properties

### .question
`String` - Vote question.

### .answers
`Array` - Vote answers.

### .author
`User` - User who created vote.

### .active
`Boolean` - Vote currently active.

### .start
`Date` - Vote start date.

### .end
`Date` - Vote end date.

### .duration
`Integer` - Duration of vote in ms.

### .remaining
`Integer` - Remaining duration of vote in ms, updated on event `update`.

### .voters
`Integer` - Total voters

### .responses
`Object` - Answers, values are `Integer`.

### .channel
`Channel` - Parent channel from vote start

# Methods

### .vote(choice)
Sends a whisper to the user
- `choice` - `String` - Vote choice

Returns `Promise`
- `boolean` - Vote success

# Events

### update
Emitted when the vote is updated
- `Vote` - Current vote

### done
Emitted when the vote is completed
- `Vote` - Current vote