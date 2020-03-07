const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const app = require('../../app')
const User = require('../../models/users')

describe('/users', () => {

  const user = {
    email: 'user1@example.net',
    password: 'asdfASDF1234!@#$',
  }

  // run before each test
  beforeEach(async () => {

    // delete all users
    await User.deleteMany()

    // save the user
    await new User(user).save()
  })

  describe('POST /users/login', () => {

    describe('if `email` is invalid', () => {

      it('should respond 401', async () => {
        await request(app)
          .post('/users/login')
          .send({ email: 1234, password: 'asdfASDF1234!@#$' })
          .expect(401)
      })

      it('should return an error message', async () => {
        await request(app)
          .post('/users/login')
          .send({ email: 1234, password: 'asdfASDF1234!@#$' })
          .expect(res => {
            expect(res.text)
              .toEqual(JSON.stringify({ 'error': 'Invalid Login' }))
          })
      })

      it('should not provide an `auth token`', async () => {
      })
    })
    describe('if `password` is invalid', () => {

      it('should respond 401', async () => {
        await request(app)
          .post('/users/login')
          .send({ email: 'email@test.net', password: 1234 })
          .expect(401)
      })

      it('should return an error message', async () => {
        await request(app)
          .post('/users/login')
          .send({ email: 'email@test.net', password: 1234 })
          .expect(res => {
            expect(res.text)
              .toEqual(JSON.stringify({ 'error': 'Invalid Login' }))
          })
      })

    })
    describe('if `email` and `password` are valid', () => {
      describe('should respond 200`', async () => {
      })
      describe('should return an `auth token`', async () => {
      })
    })

    // it('should respond 200', async () => {
    //   await request(app)
    //     .get('/login')
    //     .expect(200)
    // })
  })


  // POST /users
  describe('POST /users', () => {

    describe('if `email` is invalid', () => {

      const userWithInvalidEmail = {
        email: 1234,
        password: '1234ASDF1!@#$asdf',
      }

      it('should respond 400', async () => {
        await request(app)
          .post('/users')
          .send(userWithInvalidEmail)
          .expect(400)
      })

      it('should return an error message', async () => {
        await request(app)
          .post('/users')
          .send(userWithInvalidEmail)
          .expect(res => {
            expect(res.text)
              .toContain('error')
          })
      })

      it('should not add the user to the DB', async () => {
        await request(app)
          .post('/users')
          .send(userWithInvalidEmail)

        const foundUser = await User.findOne({ email: userWithInvalidEmail.email })
        expect(foundUser).toBeFalsy()
      })
    })

    describe('if `password` is invalid', () => {

      const userWithInvalidPassword = {
        email: 'bob@example.net',
        password: '1234',
      }

      it('should respond 400', async () => {
        await request(app)
          .post('/users')
          .send(userWithInvalidPassword)
          .expect(400)
      })

      it('should not add the user to the DB', async () => {
        await request(app)
          .post('/users')
          .send(userWithInvalidPassword)

        const foundUser = await User.findOne({ email: userWithInvalidPassword.email })
        expect(foundUser).toBeFalsy()
      })
    })

    describe('if `email` and `password` are valid', () => {

      describe('and `email` is already in the DB', () => {

        const duplicateUser = {
          email: user.email,
          password: user.password,
        }

        it('should respond 400', async () => {
          await request(app)
            .post('/users')
            .send(duplicateUser)
            .expect(400)
        })

        it('should return an error message', async () => {
          await request(app)
            .post('/users')
            .send(duplicateUser)
            .expect(res => {
              expect(res.body)
                .toEqual({ error: 'User Already Registered' })
            })
        })

        it('should not add the user to the DB', async () => {
          await request(app)
            .post('/users')
            .send(duplicateUser)

          const foundUser = await User.find()
          expect(foundUser.length).toBe(1)
        })
      })

      describe('and `email` is not already in the DB', () => {

        const newUser = {
          email: 'user2@example.net',
          password: 'asdfASDF1234!@#$',
        }

        it('should respond 200', async () => {
          await request(app)
            .post('/users')
            .send(newUser)
            .expect(200)
        })
        //       it('should hash the password', async () => {
        //       })
        //       it('should return the auth token', async () => {
        //       })
        //       it('should return the user data', async () => {
        //       })
        //       it('should add the user to the DB', async () => {
        //       })
        //     })
      })
    })

    // // GET /users
    // describe('GET /users', () => {
    //   describe('if no `auth token` is provided', () => {
    //     it('should respond 401', async () => {
    //     })
    //     it('should return an error message', async () => {
    //     })
    //     it('should not return any `user` data', async () => {
    //     })
    //   })
    //   describe('if an `auth token` is provided', () => {
    //     describe('and the `user` is not an `admin`', () => {
    //       it('should respond 401', async () => {
    //       })
    //       it('should return an error message', async () => {
    //       })
    //       it('should not return any `user` data', async () => {
    //       })
    //     })
    //     describe('and the `user` is an `admin`', () => {
    //       it('should respond 200', async () => {
    //       })
    //       it('should return all `users`', async () => {
    //       })
    //     })
    //   })
    // })
    // // GET /users/:id
    // describe('GET /users/:id', () => {
    // })
    // // DELETE /users/:id
    // describe('DELETE /users/:id', () => {
    // })
    // // PATCH /users/:id
    // describe('PATCH /users/:id', () => {
  })
})
