const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
  registerUser: async (req, res) => {

  const { fullName, username, password } = req.body;

  try {
    /*const userExists = await user.findOne({ where: { username: username }});

    if (userExists){
      return res.status(500).json({
        status: false,
        error: {
          message: 'User\'s already exist'
        }
      })
    }*/
    const newUser = await user.create({ fullName, username, password });

    return res.status(200).json({
      status: true,
      data: newUser.toJSON()
    })

  } catch (err) {

    return res.status(500).json({
      status: false,
      error: err.message
    })
  }
},

  signInUser: async(req, res) => {

    const { username, password } = req.body;

    console.log(req.body)

    try {
      const oneUer = await user.findOne({ where: { username }});

      if (!oneUer) {
        return res.status(400).json({
          status: false,
          error: {
            message: 'User not found!'
          }
        })
      }

      const passwordValid = await bcrypt.compare(password, oneUer.password);
      if (!passwordValid) {
        return res.status(404).json({
          status: false,
          error: {
            message: 'Incorrect email and password!'
          } 
        })
      }

      // Generate JWT Secret Code
      //node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
      
      // Authenticate user with jwt
      const token = jwt.sign({
          id: oneUer.id
        }, "sH4QhOengrrqCktZPRo99ROhmMupKwZ", {
          expiresIn: 60 * 60 * 24 * 30 * 1000
      })

      //console.log(token)

        return res.status(200).json({
          status: true,
          data: {
            id: oneUer.id,
            fullName: oneUer.fullName,
            username: oneUer.username,
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
}
