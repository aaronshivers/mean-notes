const express = require('express')
const router = express.Router()

const User = require('../../models/users')
const validate = require('../../middleware/validate')
const userValidator = require('../../middleware/userValidator')

router.post('/users/login', (req, res) => {
  res.status(401).json({ 'error': 'Invalid Login' })
})

router.post('/users', validate(userValidator), async (req, res) => {

  try {

    // get email and password from body
    const { email, password } = req.body

    // check DB for existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ error: 'User Already Registered'})

    // create user
    const user = await new User({ email, password })

    // save user
    await user.save()

    // respond 200 and return user data
    res.status(200).json(user)

  } catch (error) {

    // return an error message
    res.status(400).send(error.message)
  }
})

module.exports = router
