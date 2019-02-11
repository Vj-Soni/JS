

$('ul').on('click','li',function(){
    //line through
    $(this).toggleClass('line');
});

$('ul').on('click','span',function(vj){
    //to stop dom bubble
    vj.stopPropagation();
    $(this).parent().fadeOut(400 ,function(){
        $(this).remove();
    });
});

//getting input
$("input[type='text']").keypress(function(vj){
    if(vj.which===13){
        var text=$(this).val();
        $('ul').append('<li><span>X </span>'+ text+ '</li>')
        $(this).val('');
    }
});

//hiding input
$('h1 span').on('click',function(){
    $("input[type='text']").fadeToggle(200);
    // $(this).text('+');
});