const express = require('express');

const loginRouter = require('./routers/login.router');

const userRouter = require('./routers/user.router');

const categoryRouter = require('./routers/category.router');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
