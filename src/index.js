const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const CandidateRoutes = require('./routes/CandidateRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
const VoteRoutes = require('./routes/VoteRoutes');

const { sequelize } = require('./models');

const app = express();

app.use(morgan("tiny"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Sequelize initialized!!');

    app.use('/api/v1', AuthRoutes);
    app.use('/api/v1/vote', VoteRoutes);
    app.use('/api/v1/user', UserRoutes);
    app.use('/api/v1/candidate', CandidateRoutes);
    app.use('/api/v1/category', CategoryRoutes);

    app.listen(PORT, () => {
      console.log('Server Listening on PORT:', PORT);
    });
  })
  .catch((err) => {
    console.error('Sequelize initialization threw an error:', err);
  });