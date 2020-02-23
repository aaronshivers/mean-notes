const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const app = require('../../app')
const Note = require('../../models/notes')

describe('/notes', () => {
  let note

  beforeEach(() => {
    note = {
      _id: new ObjectId(),
      text: 'note1',
    }
  })

  describe('POST /notes', () => {

    beforeEach(async () => {
      await Note.deleteMany()
    })

    it('should respond 201', async () => {
      await request(app)
        .post('/notes')
        .send(note)
        .expect(201)
    })

    it('should post note to db', async () => {
      await request(app)
        .post('/notes')
        .send(note)
        .expect(res => expect(res.text).toContain(note.text))

      const foundNote = await Note.findOne({ text: note.text })
      expect(foundNote).toBeTruthy()
      expect(foundNote.text).toEqual(note.text)
    })

    it('should create only one note', async () => {
      await request(app)
        .post('/notes')
        .send(note)

      const foundNotes = await Note.find()
      expect(foundNotes.length).toBe(1)
    })
  })

  describe('GET /notes', () => {

    describe('if there are zero notes', () => {

      beforeEach(async () => await Note.deleteMany())

      it('should respond 500', async () => {
        await request(app)
          .get('/notes')
          .expect(500)
      })

      it('should return an error message', async () => {
        await request(app)
          .get('/notes')
          .expect(res => {
            expect(res.text)
              .toEqual(JSON.stringify({ error: 'No Notes Found' }))
          })
      })
    })

    describe('if there are notes', () => {

      beforeEach(async () => await new Note(note).save())

      it('should respond 200', async () => {
        await request(app)
          .get('/notes')
          .expect(200)
      })

      it('should return all notes', async () => {
        await request(app)
          .get('/notes')
          .expect(res => {
            expect(res.text).toContain(note.text)
          })
      })
    })
  })

  describe('GET /notes/:id', () => {

      describe('if `id` is invalid', () => {

        it('should respond 400', async () => {
          await request(app)
            .get(`/notes/1234`)
            .expect(400)
        })
      })

      describe('if `id` is valid', () => {

        describe('and no note is found', () => {

          it('should respond 404', async () => {
            await request(app)
              .get(`/notes/5e4983e0186afc3c3b684bbb`)
              .expect(404)
              .expect(res => {
                expect(res.text)
                  .toEqual(JSON.stringify({ error: 'Note Not Found' }))
              })
          })
        })

        describe('and the note is found', () => {

          beforeEach(async () => {
            await new Note(note).save()
          })

          it('should respond 200', async () => {
            await request(app)
              .get(`/notes/${ note._id }`)
              .expect(200)
          })

          it('should return the specified note', async () => {
            await request(app)
              .get(`/notes/${ note._id }`)
              .expect(res => {
                expect(res.text).toContain(note._id)
                expect(res.text).toContain(note.text)
              })
          })
        })
      })
    })
})
