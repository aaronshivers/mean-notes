const express = require('express')
const router = express.Router()

const Note = require('../../models/notes')

router.post('/notes', async (req, res) => {

  try {

    // get text from the body
    const { text } = req.body

    // create new note
    const note = new Note({ text })

    // save note
    await note.save()

    // return saved note
    res.status(201).json(note)

  } catch (error) {

    // return error message
    res.status(400).json(error.message)
  }
})

router.get('/notes', async (req, res) => {
  console.log('GET /notes')
  try {

    // find all notes
    const notes = await Note.find()
    console.log(notes)
    // reject if there are no notes
    if (notes.length <= 0) return res.status(500).json({ 'error': 'No Notes Found' })

    // return notes
    res.status(200).json(notes)

  } catch (error) {

    // return error message
    res.status(400).json(error.message)
  }
})

router.get('/notes/:id', async (req, res) => {

  try {

    // get note id
    const { id } = req.params

    // find note by note id and user id
    const note = await Note.findById(id)

    // reject if note is not found in the DB
    if (!note) return res.status(404).json({ error: 'Note Not Found' })

    // render note data
    res.status(200).json(note)

  } catch (error) {

    // send error message
    res.status(400).json({ error: error.message })

  }

})

module.exports = router
