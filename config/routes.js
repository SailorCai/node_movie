var _ = require('underscore');
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/Comment');
var Category = require('../app/controllers/category');

module.exports = function(app){
  //pre handle user
  app.use(function(req, res, next){
    var _user = req.session.user;

    app.locals.user = _user;

    next();
    
  });


  app.get('/', Index.index);


  //signup
  app.get('/signup', User.showSignup);
  app.post('/user/signup', User.signup);
  //signin
  app.post('/user/signin', User.signin);
  app.get('/signin', User.showSignin);
  //logout
  app.get('/logout', User.logout);
  //userlist page
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);


  //detail page
  app.get('/movie/:id', Movie.detail);
  //movie add page
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired,  Movie.new);
  // admin post movie
  app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.savePoster,  Movie.save);
  //list page
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired,  Movie.list);
  //admin update movie
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired,  Movie.update);
  //list delete movie
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired,  Movie.del);


  //comment
  app.post('/user/comment', User.signinRequired, Comment.save);

  //category
  app.get('/admin/category/new', User.signinRequired, User.adminRequired,  Category.new);
  app.post('/admin/category', User.signinRequired, User.adminRequired,  Category.save);
  app.get('/admin/category/list', User.signinRequired, User.adminRequired,  Category.list);

  // results
  app.get('/results', Index.search);
};
