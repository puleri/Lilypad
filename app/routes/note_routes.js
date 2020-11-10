const express = require('express')

const passport = require('passport')

const Note = require('../models/note')

const User = require('../models/user')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE A NEW NOTE
router.post('/notes', requireToken, (req, res, next) => {
  const noteInfo = req.body.note
  noteInfo.owner = req.user.id

  Note.create(noteInfo)
    .then(note => res.status(201).json({ note }))
    .catch(next)
})
// DELETE note
router.delete('/notes/:id', requireToken, (req, res, next) => {
  Note.findById(req.params.id)
    .then(handle404)
    .then(note => {
      requireOwnership(req, note)

      note.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// GET Index for Notes
router.get('/notes', requireToken, (req, res, next) => {
  Note.find({ owner: req.user.id })
    .populate('owner')
    .then(notes => res.json({ notes }))
    .catch(next)
})
// GET Show for a note
router.get('/notes/:id', requireToken, (req, res, next) => {
  // const id = req.params.id
  Note.findById(req.params.id)
    .then(handle404)
    .then(note => {
      requireOwnership(req, note)
      return res.json({ note })
    })
    // .then(foundNote => )
    .catch(next)
})
// UPDATE note
router.patch('/notes/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.note.owner

  Note.findById(req.params.id)
    .then(handle404)
    .then(note => {
      requireOwnership(req, note)
      return note.updateOne(req.body.note)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
