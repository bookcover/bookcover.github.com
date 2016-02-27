var select;
$("#maker li" ).each(function(){
    if(($(this).attr('class')) == "active")
    {
        console.log($(this).attr('id'));
        select =  $(this).attr('id');
        return false;
    }
}); 

book=books[Math.floor(Math.random()*books.length)];
console.log(book);
var defaultFontSize = 50;

$("#labelColor").hide();


//캔버스 설정
var canvas = new fabric.Canvas('canvas', {
    //backgroundColor : 'rgb(255,255,255)',
    allowTouchScrolling : true,
});


sCover ="img/"+(Math.floor(Math.random() *20)+1) + ".jpg";
sNumber = Math.floor(Math.random() *999)+1

document.write("<script type='text/javascript' src='"+ select +".js'><"+"/script>");  
