var breaks = 0;
var totalTime = 0;

$(document).ready(function(){
  totalTime = $('input#totalTime').val();
});

$('input#totalTime').change(function(){
  if($(this).val() > 0 && $(this).val() <= 99){
    totalTime = $(this).val();
    $('#mins').text($(this).val());
  }
});

$('input#breaks').change(function(){
  if($(this).val() > 0 && $(this).val() <= 25){
    breaks = $(this).val();
  }
});

var pressed = true;
var breakTime = false;
$(document).on('keyup', function(e){
  if(e.which == 32){
    pressed = !pressed;
    console.log("Key pressed: SpaceBar");
    if(totalTime != 0){
      var secs = 0;
      var mins = Number(totalTime);
      
      $('#min').addClass('change-mins');
      var int = setInterval(function(){
        $('#secs').addClass('change-sec');
        $('#secs').one('animationend', function(){
          $('#secs').removeClass('change-sec');
        });
        secs--;
        console.log(secs, mins);
          if(secs < 0 && !pressed){
            console.log("Seconds are 0");
            secs = 59;
            mins--;
            if(mins < 0){
              var myAudio = new Audio('http://download1647.mediafireuserdownload.com/2dndppb1azwg/x6ad9s31z9gv3d3/Ding+Sound+Effect+%282%29.mp3');
              myAudio.play();
              secs = 59;
              mins = 4;
              breakTime = true;
            }
            $('#mins').addClass('change-mins');
            $('#mins').one('animationend', function(){
              $(this).removeClass('change-mins');
            });
          }
  
          if(breakTime){
            console.log("This is Break Time");
            $('.break-text').show();
            $('.break-text').addClass('animated jello');
            $('.break-text').one('animationend', function(){
              $(this).removeClass('animated jello');
            });
            if(mins <= 0 && secs <= 0){
              breakTime = false;
              $('.break-text').hide();
              mins = Number(totalTime);
              secs = 59;
            }
          }
          
          if(pressed){
            breakTime = false;
            secs++;
            $('.break-text').hide();
            clearInterval(int);
          }
        $('#secs').text(secs);
        $('#mins').text(mins);
      },1000);
    }
  }
});