const express = require('express');
const CandidateRoutes = require("./candidates/routes");
const CategoryRoutes = require('./candidates/routes');
const Candidate = require('./common/models/candidate');
const Category = require('./common/models/category');
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const app = express();

app.use(morgan("tiny"));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set the environment to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load Sequelize configurations based on the environment
const sequelizeConfig = require('./config/config.json')[process.env.NODE_ENV];
const sequelize = new Sequelize(sequelizeConfig);

Candidate.initialize(sequelize);
Category.initialize(sequelize);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Sequelize initialized!!');

    app.use('/candidate', CandidateRoutes);
    app.use('/category', CategoryRoutes);

    app.listen(PORT, () => {
      console.log('Server Listening on PORT:', PORT);
    });
  })
  .catch((err) => {
    console.error('Sequelize initialization threw an error:', err);
  });