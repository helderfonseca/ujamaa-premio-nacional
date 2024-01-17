const express = require('express');
const CandidateRoutes = require("./routes");
const CategoryRoutes = require('./routes');
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { sequelize } = require('./models');

app.use(morgan("tiny"));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize
  .sync()
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