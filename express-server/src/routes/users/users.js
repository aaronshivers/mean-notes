const express = require('express')
const router = express.Router()

const User = require('../../models/users')

router.post('/users', async (req, res) => {
  res.sendStatus(400)
})

module.exports = router
