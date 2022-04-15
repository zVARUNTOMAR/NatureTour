const express = require('express');

const app = express();
const morgan = require('morgan'); //3rd Party Middleware
const cors = require('cors');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const miscRouter = require('./routes/miscRouter');

//Middleware for JsonReq
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Middleware Logging  Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requesTime = new Date().toISOString;
  next();
});

//Route Handlers
/* app.get('/api/v1/tours', getAllTours);
   app.post('/api/v1/tours', addNewTour);
   app.get('/api/v1/tours/:id', getTourByID);
   app.patch('/api/v1/tours/:id');
   app.delete('/api/v1/tours/:id');
*/

//Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/misc', miscRouter);

//Unhadled Route Handler
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: `${req.originalUrl} URL not found`,
  // });
  const err = new Error(`${req.originalUrl} URL not found`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.statu || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//Export
module.exports = app;
