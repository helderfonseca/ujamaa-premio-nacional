const { category } = require('../../common/models');

module.exports = {
  getAllCategories: (req, res) => {
    const { query: filters } = req;

    category.findAll(filters)
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
        error: err
      })
    })
  },

  createCategory: (req, res) => {
    const { body } = req;

    category.create(body)
    .then((category) => {
      return res.status(200).json({
        status: true,
        data: category.toJSON()
      })
      .then((err) => {
        return res.status(500).json({
          status: false,
          error: err
        })
      })
    })
  },

  updateCandidate: (req, res) => {
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
          message: "Body is empty, hence can not update the candidate"
        }
      })
    }

    category.update({ id: categoryId }, payload)
      .then(() => {
        return CandidateModel.findCategory({ id: candidateId });
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
          error: err,
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
          error: err,
        })
      })
  },
}