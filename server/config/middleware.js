var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var jauntRouter = express.Router();
  var yelpRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/www/'));
  // app.use(express.static(__dirname + '/../../APITesting/'));


  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/yelp', yelpRouter);


  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/api/jaunts', jauntRouter); // user link router for link request
  app.get('/*', jauntRouter); // user link router for link request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../jaunts/jauntRoutes.js')(jauntRouter);
  require('../yelp/yelpRoutes.js')(yelpRouter);
};
