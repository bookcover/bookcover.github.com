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

//현재 브라우져 정보
var uAgent = navigator.userAgent.toLowerCase();

book=books[Math.floor(Math.random()*books.length)];
console.log(book);

var isMobile = function () {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


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
    //익스플로러에서는 이미지 제거 속성이 없음.
    if(uAgent.indexOf("trident") == -1)
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


//모바일이나 MS브라우져에서는 canvas를 제대로 지원하지 않기 때문에 img로 변환해서 출력함.
function switchOutput()
{
    if(isMobile())
    {
        console.log("모바일 브라우져");
        $('#canvasArea').css("display","none");
        $('#iCanvas').css("display","block");
        imgOutput();
    }
    else if(uAgent.indexOf("trident") != -1 || uAgent.indexOf("edge") != -1)
    {
        console.log("MS브라우져");
        $('#canvasArea').css("display","none");
        $('#iCanvas').css("display","block");
        imgOutput();
    }
    else
    {
        console.log("어느것도 아니다");
        $('#canvasArea').css("display","block");
        $('#iCanvas').css("display","none");
    }
}

$(window).resize(function(){
    imgOutput();
    console.log("리사이즈");
});


$('#dLButton').bind('click', function(){
    if(uAgent.indexOf("trident") != -1 || uAgent.indexOf("edge") != -1)
    {
        alert("MS브라우져에서는 직접 다운로드를 지원하지 않습니다.\n\표지에 마우스 오른쪽 버튼을 눌러 \n\'다른 이름으로 이미지 저장'을 사용하세요.")
    }
    else
    {
        var data;
        if(GetCanvasAtResoution(1600, canvas))
        {
            data = canvas.toDataURL({
                format: 'jpeg',
                quality: 0.9
            });
            //window.open(data, "toDataURL() image", "width=" +canvas.getWidth() +"," + "height=" +canvas.getHeight());
            //console.log(data);
        }
        GetCanvasAtResoution(500, canvas);
        var scaleMultiplier = $('#rightCanvas').width() / canvas.width;
        $("#iCanvas").html('<img width=' + canvas.getWidth()*scaleMultiplier +" height=" + canvas.getHeight()*scaleMultiplier + ' src="' + data +'">');
        //this.href = data;
        //this.download = $("title").val() + ".png";
        //window.open(data, "toDataURL() image", "width=" +canvas.getWidth()*scaleMultiplier +"," + "height=" +canvas.getHeight()*scaleMultiplier);
        var filename = $("#title").val() + "_"+$("#publisher").val()+".jpg";

        downloadCanvas(this, data, filename);
        console.log(filename);

        //$("#canvas").hide();
    }
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

