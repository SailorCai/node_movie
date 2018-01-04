$(function(){
  $('.comment').click(function(e){
    var target = $(this);
    var toId = target.data('tid');
    var commentId = target.data('cid');
    //var tr = $('.item-id-' + id);
   if($('#toId').length > 0){
    $('#toId').val(toId);
    $('#commentId').val(commentId);
   }else{
     $('<input>').attr({
      type: 'hidden',
      id: 'toId',
      name: 'comment[tid]',
      value: toId
     }).appendTo('#commentForm');

     $('<input>').attr({
      type: 'hidden',
      id: 'commentId',
      name: 'comment[cid]',
      value: commentId
     }).appendTo('#commentForm');
   };
  });
});