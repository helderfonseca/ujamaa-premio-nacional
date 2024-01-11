const CategoryModel = require('../../common/models/category');

module.exports = {
  getAllCategories: (req, res) => {
    const { query: filters } = req;

    CategoryModel.findAllCategories(filters)
    .then((categories) => {
      return res.status(200).json({
        status: true,
        data: categories
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err
      })
    })
  },

  getCategoryById: () => {
    const { params: categoryId } = req;

    CategoryModel.findCategory({ id: categoryId }) 
    .then((category) => {
      return res.status(200).json({
        status: true,
        data: category.toJSON()
      })
    })
    .then((err) => {
      return res.status(500).json({
        status: false,
        error: err
      })
    })
  },

  
}