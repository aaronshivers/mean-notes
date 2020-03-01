const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const app = require('../../app')
const User = require('../../models/users')

describe('/users', () => {
  let user

  beforeEach(async () => {
    user = {
      _id: new ObjectId(),
      email: 'user1',
      password: 'pass1',
    }

    await User.deleteMany()
    await new User(user).save()
  })

  // POST /users
  describe('POST /users', () => {

    beforeEach(async () => await User.deleteMany())

    describe('if `email` is invalid', () => {
      it('should respond 400', async () => {
        await request(app)
          .post('/users')
          .send(user)
          .expect(400)
      })
      it('should return an error message', () => {
      })
      it('should not add the user to the DB', async () => {
        await request(app)
          .post('/users')
          .send(user)

        const foundUser = await User.findOne({ email: user.email })
        console.log(foundUser)
        expect(foundUser.email).not.toContain(user.email)
      })
    })
    describe('if `password` is invalid', () => {
      it('should respond 400', async () => {
      })
      it('should not add the user to the DB', async () => {
      })
    })
    describe('if `email` and `password` are valid', () => {
      describe('and `email` is already in the DB', () => {
        it('should respond 400', async () => {
        })
        it('should not add the user to the DB', async () => {
        })
      })
      describe('and `email` is not already in the DB', () => {
        it('should respond 200', async () => {
        })
        it('should hash the password', async () => {
        })
        it('should return the auth token', async () => {
        })
        it('should return the user data', async () => {
        })
        it('should add the user to the DB', async () => {
        })
      })
    })
  })
  // GET /users
  describe('GET /users', () => {
    describe('if no `auth token` is provided', () => {
      it('should respond 401', async () => {
      })
      it('should return an error message', async () => {
      })
      it('should not return any `user` data', async () => {
      })
    })
    describe('if an `auth token` is provided', () => {
      describe('and the `user` is not an `admin`', () => {
        it('should respond 401', async () => {
        })
        it('should return an error message', async () => {
        })
        it('should not return any `user` data', async () => {
        })
      })
      describe('and the `user` is an `admin`', () => {
        it('should respond 200', async () => {
        })
        it('should return all `users`', async () => {
        })
      })
    })
  })
  // GET /users/:id
  describe('GET /users/:id', () => {
  })
  // DELETE /users/:id
  describe('DELETE /users/:id', () => {
  })
  // PATCH /users/:id
  describe('PATCH /users/:id', () => {
  })
})
