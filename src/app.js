const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost/backend-boilerplate')
mongoose.set('debug', true)

require('./models/User')
require('./config/passport')
app.use(require('./routes'))

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    })
  })
}

app.use((err, req, res) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

app.listen(8000, () => console.log('Server running on http://localhost:8000/'))