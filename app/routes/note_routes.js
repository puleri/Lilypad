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
  req.body.note.owner = req.user.id

  // const noteData = req.body.note
  // console.log(req.user.id)
  // // User.findById(req.user.id)
  // //   .then(handle404)
  // //   .then(user => {
  // //     user.notes.push(noteData)
  // //     console.log(user)
  // //     return user.save()
  // //   })
  Note.create(req.body.note)
    .then(note => {
      res.status(201).json({ note: note.toObject() })
    })
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
  Note.find()
    .then(notes => {
      return notes.map(note => note.toObject())
    })
    .then(notes => {
      res.status(200).json({ notes: notes })
    })
    .catch(next)
})
// GET Show for a note
router.get('/notes/:id', requireToken, (req, res, next) => {
  Note.findById(req.params.id)
    .then(handle404)
    .then(note => res.status(200).json({ note: note.toObject() }))
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
