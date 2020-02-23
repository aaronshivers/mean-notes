const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://mongo:/mean-notes', options)
    console.log(`MongoDB Connected: ${ conn.connection.host }`)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = connectToDB
