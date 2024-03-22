const asyncHandler = require('express-async-handler')

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get all contacts' })
})

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact: ${req.params.id}` })
})

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  if (!email || !name || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory!') // this error message is not in the json
    //format it is in the html format so to change it we have to create user defined middleware
  }
  res.status(200).json({ message: 'Create contacts' })
})

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact: ${req.params.id} ` })
})

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact: ${req.params.id} ` })
})

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
}
