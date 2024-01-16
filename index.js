const express = require('express');
const CandidateRoutes = require("./candidates/routes");
const CategoryRoutes = require('./candidates/routes');
const Candidate = require('./common/models/candidate');
const Category = require('./common/models/category');
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { sequelize } = require('./common/models');

app.use(morgan("tiny"));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

//Candidate.initialize(sequelize);
//Category.initialize(sequelize);

//console.log(CandidateObject);

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