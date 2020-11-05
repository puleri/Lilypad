const express = require('express')

const passport = require('passport')

const Note = require('../models/note')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/notes', requireToken, (req, res, next) => {
  req.body.note.owner = req.user.id

  Note.create(req.body.note)
    .then(note => {
      res.status(201).json({ note: note.toObject() })
    })
    .catch(next)
})

module.exports = router
