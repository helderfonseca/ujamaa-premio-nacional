const { user } = require('../models/user');


module.exports = {
  has: (role) => {

    return async(req, res, next) => {

      const {
        user: { id },
      } = req;


      const userF = await user.findOne({ where: { id }});

      if (!userF) {

        return res.status(403).json({
          status: false,
          error: "Invalid access token provided, please login again."
        })
      }

      const userRole = user.role;

      if (userRole != role) {

        return res.status(403).json({
          status: false,
          error: `You need to be a ${role} to access this endpoint.`
        })
      }

      next();

    }
  }
}