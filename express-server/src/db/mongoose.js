const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

const a = 'mongodb://mongo:/mean-notes'
const b = 'mongodb://localhost:27017/notes'

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(a, options)
    console.log(`MongoDB Connected: ${ conn.connection.host }`)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = connectToDB
