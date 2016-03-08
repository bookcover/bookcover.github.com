//상단 메뉴 선택에 따라 스크립트를 선택할 수 있도록 값을 가져온다
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

//라벨 색 결정
var lColor;
//책 프리셋에 라벨색이 지정되어 있다면 일단 그 색을 따름.
if(book.labelColor !== "")
{
    lColor = book.labelColor;
}
else
{   //색상이 지정되어 있지 않으면 랜덤으로 만들어낸다.
    lColor = randomColor();
}

//hex컬러값에서 hsl로 변환하는 함수
function hexToHsl(color)
{
    var rgb = [],  fail = false;
    hex = (color+'').replace(/#/, '');
    for (var i = 0; i < 6; i+=2) {
       rgb.push(parseInt(hex.substr(i,2),16));
       fail = fail || rgb[rgb.length - 1].toString() === 'NaN';
    }
    //console.log(rgb);
    return rgbToHsl(rgb[0],rgb[1],rgb[2]);
}
//rgb값을 넣으면 hsl값으로 변환해주는 함수
function rgbToHsl(r, g, b){
    //console.log(g);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) { h = s = 0; } 
    else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
    }

    return [(h*360+0.5)|0, ((s*100+0.5)|0) , ((l*100+0.5)|0)];
}




$("#labelColor").hide();


//캔버스 설정
var canvas = new fabric.Canvas('canvas', {
    //backgroundColor : 'rgb(255,255,255)',
    allowTouchScrolling : true,
});


var sCover ="img/"+(Math.floor(Math.random() *20)+1) + ".jpg";
var sNumber = Math.floor(Math.random() *999)+1

var dColor; 
var colorThief = new ColorThief();
var rgb;
img = new Image();
img.src = sCover;
img.onload = function(){    
    rgb = colorThief.getColor(this);
    dColor =  "#"+ rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
    img.remove();
}


console.log("대표컬러 : " + dColor);
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
    //return canvas.toDataURL();
    return true;
}


$('#dLButton').bind('click', function(){
    var data;
    if(GetCanvasAtResoution(1000, canvas))
    {
        data = canvas.toDataURL();
        window.open(data, "toDataURL() image", "width=" +canvas.getWidth() +"," + "height=" +canvas.getHeight());
        console.log(data);
    }
    GetCanvasAtResoution(500, canvas);
    var scaleMultiplier = $('#rightCanvas').width() / canvas.width;
    $("#iCanvas").html('<img width=' + canvas.getWidth()*scaleMultiplier +" height=" + canvas.getHeight()*scaleMultiplier + ' src="' + data +'">');
    //this.href = data;
    //this.download = $("title").val() + ".png";
    //window.open(data, "toDataURL() image", "width=" +canvas.getWidth()*scaleMultiplier +"," + "height=" +canvas.getHeight()*scaleMultiplier);
    var filename = $("title").val() + ".png";
    downloadCanvas(this, data, filename);
    
    //$("#canvas").hide();
});

function downloadCanvas(link, data, filename) {
    link.href = data;
    link.download = filename;
}


function imgOutput()
{
    var data;
    if(GetCanvasAtResoution(1000, canvas))
        data = canvas.toDataURL();
    GetCanvasAtResoution(500, canvas);
    var scaleMultiplier = $('#rightCanvas').width() / canvas.width;
    $("#iCanvas").html('<img width=' + canvas.getWidth()*scaleMultiplier +" height=" + canvas.getHeight()*scaleMultiplier + ' src="' + data +'">');
    //$("#canvas").hide();
}

function randomColor()
{
    r = (Math.floor(Math.random()*256));
    g = (Math.floor(Math.random()*256));
    b = (Math.floor(Math.random()*256));
    console.log("RGB : " + "#"+ r.toString(16) + g.toString(16) + b.toString(16));
    return "#"+ r.toString(16) + g.toString(16) + b.toString(16);
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

