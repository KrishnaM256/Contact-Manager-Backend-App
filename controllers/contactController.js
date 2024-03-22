const asyncHandler = require('express-async-handler')
Contact = require('../models/contactModel')

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json({ contacts })
})

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
    return
  }
  res.status(200).json({ contact })
})

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  res.status(400)
  if (!email || !name || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory!') // this error message is not in the json
    //format it is in the html format so to change it we have to create user defined middleware
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  })
  res.status(201).json({ contact })
})

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found!')
    return
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found!')
    return
  }
  const deletedContact = await Contact.deleteOne({ _id: req.params.id })
  res.status(200).json({ deletedContact })
})

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
}
