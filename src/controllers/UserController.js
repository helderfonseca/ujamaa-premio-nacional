const { user } = require('../models');


module.exports = {
  getUser: async(req, res) => {
    const {
      params: { id },
    } = req;


    try {
      const findUser = await user.findOne({ where: { id } });
      return res.status(200).json({
        status: true,
        data: findUser.toJSON()
      });
    } catch(err) {
      return res.status(500).json({
        status: false,
        error: {
          message: err
        }
      });
    }
  },

  updateUser: async (req, res) => {
    const {
      params: { id },
      body: payload
    } = req;


    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence can not update User'
        }
      })
    }

    try {
        const updatedUser = await user.update({ where: { id } }, payload);
        return res.status(200).json({
          status: true,
          data: updatedUser.toJSON()
        })
    } catch(err) {
      return res.status(500).json({
        status: false,
        error: err.message
      });
    }
  },

  deleteUser: async (req, res) => {
    const {
      params: { userId },
    } = req;

    try {
      const userD = await user.destroy({ id: userId });
      return res.status(200).json({
        status: true,
        data: {
          userDeleted: userD
        }
      })
    }catch(err) {
      return res.status(500).json({
        status: false,
        data: err.message
      })
    }
  },

  getAllUsers: async (req, res) => {
    
    try {
      const users = await user.findAll();
      return res.status(200).json({
        status: true,
        data: users
      });
    } catch(err){
      return res.status(500).json({
        status: false,
        error: err.message
      })
    }
  },

  changeRole: async (req, res) => {

    const {
      params: { id },
      body: { role }
    } = req;

    console.log(id);

    if(!Object.keys(role).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Role is empty, no Role provided'
        }
      })
    }

    /*let values = { 
      role
    };

    let selector = { 
      where: {
          id
        }
    };*/

    try {

      const userRoleChanged = await user.update({ role: req.body.role }, { where: { id: id }});
      return res.status(200).json({
        status: true,
        data: userRoleChanged.toJSON()
      })
    } catch(err) {
      return res.status(500).json({
        status: false,
        error: err.message
      })
    }
  },

  /*changeRole: (req, res) => {

    const {
      params: { id },
      body: { role },
    } = req;

    user.update({ id }, { role })
      .then(() => {
        return user.findOne({ id });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },*/
}