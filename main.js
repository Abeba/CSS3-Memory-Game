function randomNumber(number){
    var tal = Math.round(Math.random() * number);
    if(tal === 0){
      return randomNumber(number);
    }
    return tal;
  } 
Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return this;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
}
function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}

var source = $("#card").html();
var template = Handlebars.compile(source);
            
$(function() {
  var choosen = [];
  var counter = 0;
  var timeoutID;
  var person1;
  var person2;
  var firstclick;

  for (var i = 0; i < 9; i++) {
    var context = data.data.splice(randomNumber(data.data.length) - 1, 1);
        context[0].name = context[0].name.substr(0, 17);
    choosen.push(context[0]);
    choosen.push(context[0]);
  }
  
  shuffle(choosen);

  var htmlstring;
  for (var y = 0; y < 18; y++) {
    var context2 = choosen.pop();
    var html = template(context2);
    htmlstring += html;
  }
  $('#app').append(htmlstring);


  function vend() {
    if($(this).hasClass('hover_effect')) return;
    if(counter === 0){
      window.clearTimeout(timeoutID);
      $('.hover_effect').removeClass('hover_effect');
    }
    $(this).toggleClass('hover_effect');
    counter++;
    if(counter === 1){
      person1 = $(this).data('id');
      firstclick = $(this);
    }
    if (counter === 2) {
      person2 = $(this).data('id');
      if(person1 === person2){
          $(this).add(firstclick).addClass('final');
      }
      if($('.final').length === 18){
        alert('Du vandt! Tillykke! Tryk OK for at prøve igen.');
        location.reload();
      }
      timeoutID = window.setTimeout(function() {
        $('.hover_effect').removeClass('hover_effect');

      }, 5000);
      counter = 0;
    }
  }
  
  $('.card_container').click(vend);

});