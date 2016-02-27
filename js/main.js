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

//초기 변수 설정
var cCoverArt;
var cCoverLine;
var cSeries;
var cTitle;
var cLabelU;
var cLabelD;
var cAuthor;
var cOriginalTitle;
var cTranslator;
var cPublisher;
var cgLDTBox;
var cCover;




function GetCanvasAtResoution(newWidth, canvas)
{
    if (canvas.width != newWidth) {
        var scaleMultiplier = newWidth / canvas.width;
        var objects = canvas.getObjects();
        for (var i in objects) {
            objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
            objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
            objects[i].left = objects[i].left * scaleMultiplier;
            objects[i].top = objects[i].top * scaleMultiplier;
            objects[i].setCoords();
        }
        canvas.setWidth(canvas.getWidth() * scaleMultiplier);
        canvas.setHeight(canvas.getHeight() * scaleMultiplier);
        canvas.renderAll();
        canvas.calcOffset();
    }
    return canvas.toDataURL();
}


$('#dLButton').bind('click', function(){
    data = GetCanvasAtResoution(1000, canvas);
    GetCanvasAtResoution(500, canvas);
    var scaleMultiplier = $('#rightCanvas').width() / canvas.width;
    $("#iCanvas").html('<img width=' + canvas.getWidth()*scaleMultiplier +" height=" + canvas.getHeight()*scaleMultiplier + ' src="' + data +'">');
    //$("#canvas").hide();
});


function imgOutput()
{
    data = GetCanvasAtResoution(1000, canvas);
    GetCanvasAtResoution(500, canvas);
    var scaleMultiplier = $('#rightCanvas').width() / canvas.width;
    $("#iCanvas").html('<img width=' + canvas.getWidth()*scaleMultiplier +" height=" + canvas.getHeight()*scaleMultiplier + ' src="' + data +'">');
    //$("#canvas").hide();
}



document.write("<script type='text/javascript' src='js/"+ select +".js'><"+"/script>");  





//canvas 리사이즈 관련 답변
//http://stackoverflow.com/questions/30862356/fabric-js-resize-canvas-to-fit-screen

//$(window).resize(function (){
// if (canvas.width != $("#rightCanvas").width()) {
//            var scaleMultiplier = $("#rightCanvas").width() / canvas.width;
//            var objects = canvas.getObjects();
//            for (var i in objects) {
//                objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
//                objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
//                objects[i].left = objects[i].left * scaleMultiplier;
//                objects[i].top = objects[i].top * scaleMultiplier;
//                objects[i].setCoords();
//            }
//
//            canvas.setWidth(canvas.getWidth() * scaleMultiplier);
//            canvas.setHeight(canvas.getHeight() * scaleMultiplier);
//            canvas.renderAll();
//            canvas.calcOffset();
//        }
//});

