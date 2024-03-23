const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body
  if (!email || !username || !password) {
    res.status(400)
    throw new Error('All fields required!')
  }
  const userAvail = await Users.findOne({ email })
  if (userAvail) {
    res.status(400)
    throw new Error('User already registered')
  }
  const usernameAvail = await Users.findOne({ username })
  if (usernameAvail) {
    res.status(400)
    throw new Error('Username already taken!')
  }
  const hashedpassword = await bcrypt.hash(password, 10)
  const user = await Users.create({ username, email, password: hashedpassword })
  if (user) {
    res.status(201).send({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('User data not valid!')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if (!email || !username || !password) {
    res.status(400)
    throw new Error('All fields required!')
  }
  const user = await Users.findOne({ username })
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    )
  }
  res.send({ accessToken })
})

const currentUser = asyncHandler(async (req, res) => {
  res.send({ message: 'Current user info' })
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
