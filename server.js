require('dotenv').config()
const express = require('express')
const cors = require('cors')
const AssistantV2 = require('ibm-watson/assistant/v2')

const app = express()
app.use(express.json())
app.use(cors())

/**
 * Instantiate the Watson Assistant Service
 */
const assistant = new AssistantV2({
  version: '2019-02-28',
  iam_apikey: process.env.ASSISTANT_API,
  url: process.env.ASSISTANT_URL
})

app.post('/api/message', (req, res) => {
  const payload = {
    assistant_id: process.env.ASSISTANT_ID,
    session_id: req.body.from,
    input: {
      message_type: 'text',
      text: req.body.text
    }
  }
  console.log(
    `Recieved message from ${payload.session_id} saying '${payload.input.text}'`
  )
  assistant
    .message(payload)
    .then(response => {
      console.log(`Watson response: ${response.output.generic[0].text}`)

      return res.json({
        output: {
          text: response.output.generic[0].text
        }
      })
    })
    .catch(err => {
      console.log(err)
      return res.json(err)
    })
})

app.get('/api/session', (req, res) => {
  assistant
    .createSession({
      assistant_id: process.env.ASSISTANT_ID
    })
    .then(response => {
      console.log(`Session ${response.session_id} created`)
      return res.json(response)
    })
    .catch(err => {
      console.log(err)
      return res.json(err)
    })
})

// Handling production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(`${__dirname}/public/`))
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on ${port}`))
