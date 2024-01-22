const express = require('express');
const CandidateRoutes = require('./routes/CandidateRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { sequelize } = require('./models');

app.use(morgan("tiny"));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Sequelize initialized!!');

    app.use('/api/v1/candidate', CandidateRoutes);
    app.use('/api/v1/category', CategoryRoutes);
    app.use('/api/v1', AuthRoutes);

    app.listen(PORT, () => {
      console.log('Server Listening on PORT:', PORT);
    });
  })
  .catch((err) => {
    console.error('Sequelize initialization threw an error:', err);
  });