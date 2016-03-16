$(document).ready(function() {

    $('#submit-button').on('click', postData);


    $('.personData').on('click', function(){
      event.preventDefault();

      var $el = $(this);
      var btnvalue = $el.data('id');
      var personObject = {name: ''+ btnvalue};
      $.ajax({
          type: "DELETE",
          url:"/people",
          data: personObject,
          success: function(data){
            console.log("yey! returned from server:", data);
            $('.personData').empty();
            getData();
              // if(data.ans == "undefined"){
              //   $('.FinalOutput').text('');
              // }else{
              //   $('.FinalOutput').text(''+data.ans);
              // }

          }
      });
  });














});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendDom(data);
        }
    });
}
function appendDom(data){
  for(var i = 0; i<data.length; i++){
  console.log('data in GET request' , data[i].name);
  $('.personData').append('<div class="person-'+data[i].name+'"</div>');
  var $el=$('.personData').children().last();
  $el.append('<p>'+data[i].name+'</p>');
  $el.append('<p>'+data[i].address+'</p>');
  $el.append('<p>'+data[i].city+'</p>');
  $el.append('<p>'+data[i].state+'</p>');
  $el.append('<p>'+data[i].zip_code+'</p>');
  $el.append('<button class="delete-button" data-id="'+data[i].id+'">delete</button');

  }
}
