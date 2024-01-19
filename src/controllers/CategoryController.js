const { category, candidate } = require('../models');

module.exports = {
  getAllCategories: async (req, res) => {

    try {
      const categories = await category.findAll({ include: candidate });
      return res.status(200).json({
        status: true,
        data: categories
      });
    } catch(err){
      return res.status(500).json({
        status: false,
        error: err.message
      })
    }
  },

  getCategoryById: () => {
    const { params: categoryId } = req;

    category.findOne({ id: categoryId }) 
      .then((category) => {
        return res.status(200).json({
          status: true,
          data: category.toJSON()
        })
      })
      .then((err) => {
        return res.status(500).json({
          status: false,
          error: err.message
        })
      })
  },

  createCategory: async (req, res) => {
    const { body } = req;

    try {
      const newCategory = await category.create(body);
      return res.status(201).json({
        status: true,
        data: newCategory.toJSON()
      });
    } catch(err){
      return res.status(500).json({
          status: false,
          error: err.message
      })}
  },

  updateCategory: (req, res) => {
    const {
      params: { categoryId },
      body: payload,
    } = req;

    //if the payload does not have any keys,
    // Then we can return an error, as nothing can be update
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Category"
        }
      })
    }

    category.update({ id: categoryId }, payload)
      .then(() => {
        return category.findCategory({ id: categoryId });
      })
      .then((category) => {
        return res.status(200).json({
          status: true,
          data: category.toJSON(),
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err.message
        })
      })
  },

  deleteCategory: (req, res) => {
    const {
      params: { categoryId },
    } = req;

    category.destroy({ id: categoryId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfCategoriesDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err.message
        })
      })
  },
}