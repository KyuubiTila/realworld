const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const userRouter = require('./routes/UsersRoute');
const {
  globalErrorHandler,
  notFoundHandler,
} = require('./middleware/globalErrorHandler');
require('dotenv').config();

app.use(express.json());

var corOptions = {
  origin: '*',
};
app.use(cors(corOptions));

app.use(express.urlencoded({ extended: true }));

// -------------ROUTERS---------------

// ---------users route---------
app.use('/api/user', userRouter);

// Error Handling Middlewares
app.use(notFoundHandler);

app.use(globalErrorHandler);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`server is running on port 3001`);
  });
});
