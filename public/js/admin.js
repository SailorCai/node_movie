$(function(){
  $('.del').click(function(e){
    var target = $(e.target);
    var id = target.data('id');
    var tr = $('.item-id-' + id);

    $.ajax({
      type:'DELETE',
      url:'/admin/movie/list?id='+id
    })
    .done(function(results){
      if(results.success === 1){
        if(tr.length>0){
          tr.remove();
        };
      };
    });
  });

  $('#douban').blur(function(){
    var douban = $(this);
    var id = douban.val();
    $.ajax({
      url: 'https://api.douban.com/v2/movie/subject/' + id,
      cache: true,
      type: 'get',
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'callback',
      success: function(data){
        $('#inputTitle').val(data.title);
        $('#inputDoctor').val(data.directors[0].name);
        $('#inputCountry').val(data.countries[0]);
        //$('inputLanguage').val(data.);
        //$('inputPoster').val(data.);
        $('#inputYear').val(data.year);
        $('#inputPoster').val(data.images.large);
        $('#inputSummary').val(data.summary);
      }
    });
  });
});