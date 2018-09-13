const express = require('express');
const minifyHTML = require('express-minify-html');
const app = express();

app.use(minifyHTML({
  override:      true,
  exception_url: false,
  htmlMinifier: {
    removeComments:            true,
    collapseWhitespace:        true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes:     true,
    removeEmptyAttributes:     true,
    minifyJS:                  true
  }
}));

const morgan = require('morgan');
const bodyParser = require('body-parser');

const path  = require('path'); // <<<<<-----

const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const contentRoutes = require('./api/routes/content');
const newsRoutes = require('./api/routes/news');
const reviewRoutes = require('./api/routes/reviews');

// mongoose.Promise = Promise;
mongoose.set('debug', true); // if - !prod



const Content = require('./api/models/content');







// var address = process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1';
// var port = process.env.MONGO_PORT_27017_TCP_PORT || '27017';
// var dbName = process.env.MONGO_DATABASE_NAME || 'hrbase';
//
// // Build the connection string
// var dbURI = `mongodb://${address}:${port}/${dbName}`;
//
// // Create the database connection
// var connection = mongoose.createConnection(dbURI);





mongoose.connect('mongodb://localhost:27017/myapi', { // proka4
    // useMongoClient: true
}).catch(err => {
  if (err.message.indexOf("ECONNREFUSED") !== -1) {
    console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
    process.exit(1);
  } else {
    throw err;
  }
});

// mongoose.Promise = global.Promise; // fix some error

app.set('views', './views');
app.set('view engine', 'pug');

app.use(morgan('dev'));
// publicly available routes
//app.use(express.static('uploads')); // url: http://localhost:3000/filename.jpg !!! no /uploads/!!!!
// app.use('/uploads', express.static('uploads')); // uploads/imgaddr.png
app.use(express.static('static'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*'); // * - allow from any url
  // res.header('Access-Control-Allow-Origin', 'http://my-cool-page.com')
  // res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/content', contentRoutes);
app.use('/news', newsRoutes);
app.use('/reviews', reviewRoutes);

// ADMIN PANEL ======
app.get('/admin/*',function(req,res){
  res.sendFile(path.join(__dirname+'/static/admin/index.html'));
});

// Redirect paths to FONTS (static with admin/static) - react app
// app.get('/static/*',function(req,res){
//   res.redirect('/admin/static');
// });

// LANDING PAGE ======
app.get('/', async (req, res) => {
  const content = await Content.findOne({ key: 'main_content' })
    .select('main about programs benefits prizes teachers contacts');
  res.render('landing/index', content, function(err, html) {
    res.send(html);
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

module.exports = app;