const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const userRouter = require('./routes/UsersRoute');
const profileRouter = require('./routes/ProfileRoute');
const articleRouter = require('./routes/ArticleRoute');
const commentRouter = require('./routes/CommentRoute');
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

// ---------profile route---------
app.use('/api/profile', profileRouter);

// ---------article route---------
app.use('/api/articles', articleRouter);

// ---------comment route---------
app.use('/api/comments', commentRouter);

// Error Handling Middlewares
app.use(notFoundHandler);

app.use(globalErrorHandler);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`server is running on port 3001`);
  });
});
