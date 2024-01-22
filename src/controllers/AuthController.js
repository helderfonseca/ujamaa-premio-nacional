const { user } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async(req, res) => {
  try {
    const { fullName, username, password } = req.body;

    const userExists = await user.findOne({ where: { username }});

    if (userExists){
      return res.status(500).json({
        status: false,
        error: {
          message: 'User\'s already exist'
        }
      })
    }

    const newUser = await user.create({ fullName, username, password: await bcrypt.hash(password, 15) });

    return res.status(200).json({
      status: true,
      data: newUser
    })

  } catch(err) {

    return res.status(500).json({
      status: false,
      error: err.message
    })
  }
}

const signInUser = async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await user.findOne({ where: { username }});

    if (!user) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'User not found!'
        }
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json({
        status: false,
        error: {
          message: 'Incorrect email and password!'
        } 
      })
    }

    // Authenticate user with jwt
    const token = jwt.sign({
      id: user.id
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION
    })

    return res.status(200).json({
      status: true,
      data: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        accessToken: token
      }
    })
  } catch(err) {
    return res.status(500).json({
      status: false,
      error: err.message
    })
  }
}

module.exports = {
  registerUser,
  signInUser
}