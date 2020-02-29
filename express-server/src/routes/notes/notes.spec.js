const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const app = require('../../app')
const Note = require('../../models/notes')

describe('/notes', () => {
  let note

  beforeEach(async () => {
    note = {
      _id: new ObjectId(),
      text: 'note1',
    }

    await Note.deleteMany()
    await new Note(note).save()
  })


  describe('POST /notes', () => {

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

    it('should add a second note', async () => {

      await request(app)
        .post('/notes')
        .send(note)

      const foundNotes = await Note.find()
      expect(foundNotes.length).toBe(2)
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

  describe('DELETE /notes/:id', () => {

    describe('if `id` is invalid', () => {

      it('should respond 400', async () => {
        await request(app)
          .delete(`/notes/1234`)
          .expect(400)
      })

      it('should not delete any notes', async () => {
        await request(app)
          .delete(`/notes/1234`)

        const foundNotes = await Note.find()
        expect(foundNotes).toBeTruthy()
        expect(foundNotes.length).toBe(1)
      })
    })

    describe('if `id` is valid', () => {

      describe('and note does not exist', () => {

        it('should respond 404', async () => {
          await request(app)
            .delete(`/notes/5e547e0d22e5ea5888ca32d2`)
            .expect(404)
        })

        it('should return an error message', async () => {
          await request(app)
            .delete(`/notes/5e547e0d22e5ea5888ca32d2`)
            .expect(res => {
              expect(res.text)
                .toEqual(JSON.stringify({ error: 'Note Not Found' }))
            })
        })
      })

      describe('and note does exist', () => {

        it('should respond 200', async () => {
          await request(app)
            .delete(`/notes/${ note._id }`)
            .expect(200)
        })
      })
    })
  })

  describe('PATCH /notes/:id', () => {

    describe('if `id` is invalid', () => {

      it('should respond 400', async () => {
        await request(app)
          .patch(`/notes/1234`)
          .expect(400)
      })
    })

    describe('if `id` is valid', () => {

      describe('and if `id` is not in the DB', () => {

        it('should respond 404', async () => {
          await request(app)
            .patch(`/notes/` + new ObjectId())
            .expect(404)
        })

        it('should return an error message', async () => {
          await request(app)
            .patch(`/notes/` + new ObjectId())
            .expect(res => {
              expect(res.text)
                .toEqual(JSON.stringify({ error: 'Note Not Found' }))
            })
        })
      })

      describe('and if `id` is in the DB', () => {

        describe('and if updated data is invalid', () => {
          const update = { completed: 1234 }

          it('should respond 400', async () => {
            await request(app)
              .patch(`/notes/${ note._id }`)
              .expect(400)
              .send(update)
          })

          it('should return an error message', async () => {
            await request(app)
              .patch(`/notes/${ note._id }`)
              .send(update)
              .expect(res => {
                expect(res.text)
                  .toEqual(JSON.stringify({ error: 'Completed Must be Boolean' }))
              })
          })

          it('should not update the specified note', async () => {
            await request(app)
              .patch(`/notes/${ note._id }`)
              .send(update)

            const foundNote = await Note.findById(note._id)
            expect(foundNote.completed).toBe(false)
          })
        })

        describe('and if updated data is valid', () => {
          const update = { completed: true }

          it('should respond 201', async () => {
            await request(app)
              .patch(`/notes/${ note._id }`)
              .expect(201)
              .send(update)
          })

          it('should update the specified note', async () => {
            await request(app)
              .patch(`/notes/${ note._id }`)
              .send(update)

            const foundNote = await Note.findById(note._id)
            expect(foundNote.completed).toBe(true)
          })
        })
      })
    })
  })
})
