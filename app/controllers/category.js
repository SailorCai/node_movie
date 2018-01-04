var Category = require('../models/category');

exports.new = function(req, res){
  res.render('categoryAdmin', {
    title: '电影分类录入页',
    category: {}
  });
};

  // admin post movie
exports.save = function(req, res){
  var _category = req.body.category;

	var category = new Category(_category);
	category.save(function(err, category){
	  if(err){
	    console.log(err);
	  };
	  res.redirect('/admin/category/list');
	});
};

  //userlist page
exports.list = function(req, res){
  Category.fetch(function(err, categories){
    if(err){
      console.log(err);
    };
    res.render('categorylist', {
      title: '电影分类列表',
      categories: categories
    });
  });
};

  //admin update movie
exports.update = function(req, res){
  var id = req.params.id;

  if(id){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err);
      };
      console.log(movie);
      res.render('admin', {
        title: '电影更新页',
        movie: movie
      });
    });
  };
};

  //list delete movie
exports.del = function(req, res){
  var id = req.query.id;

  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err);
      }else{
        res.json({success: 1});
      };

    });
  };
};

