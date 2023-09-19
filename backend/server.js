const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const userRouter = require('./routes/UsersRoute');

app.use(express.json());

var corOptions = {
  origin: '*',
};
app.use(cors(corOptions));

app.use(express.urlencoded({ extended: true }));

// -------------ROUTERS---------------

// ---------users route---------
app.use('/api/user', userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`server is running on port 3001`);
  });
});
