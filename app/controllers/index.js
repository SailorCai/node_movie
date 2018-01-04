var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index = function(req, res){
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, categories){
		  if(err){
		    console.log(err);
		  };
		  console.log(categories);
		  res.render('index', {
		    title: '电影首页',
		    categories: categories
		  });
	});
};

// search page
exports.search = function(req, res){
	var catId = req.query.cat;
	var page = parseInt(req.query.p, 10) || 0;
	var q = req.query.q;

	var count = 2;

	var index = page*count;

	if(catId){
		Category
			.find({_id: catId})
			.populate({path: 'movies', select: 'title poster'})
			.exec(function(err, categories){
			  if(err){
			    console.log(err);
			  };
			  
			  var category = categories[0] || {};
			  var movies = category.movies || [];
			  var results = movies.slice(index, index + count);

			  res.render('results', {
			    title: 'imooc 结果列表页面',
			    keyword: category.name,
			    currentPage: (Number(page) + 1),
			    query: 'cat=' + catId,
			    totalPage: Math.ceil(movies.length / count),
			    movies: results
			  });
		});
	}else{
		Movie
		.find({title: new RegExp(q+'.*', 'i')})
		.exec(function(err, movies){
			  if(err){
			    console.log(err);
			  };
			  console.log(movies);
			  
			  var results = movies.slice(index, index + count);

			  res.render('results', {
			    title: 'imooc 结果列表页面',
			    keyword: q,
			    currentPage: (Number(page) + 1),
			    query: 'q=' + q,
			    totalPage: Math.ceil(movies.length / count),
			    movies: results
			  });
		})
	};

};
