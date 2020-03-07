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
    // get email from body
    const { email } = req.body

    // create user
    const user = await new User({ email })

    // save user
    user.save()

    res.sendStatus(400)
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
