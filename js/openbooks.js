document.getElementById("canvas").onresize = waveToAudience;
  function waveToAudience() {
    alert("Waving like I've never waved before!");
}
  
//세로 표지를 살리기 위한 이미지 추가 설정  
//표지 설정
if((Math.floor(Math.random() *2)))
    sCover ="img/"+(Math.floor(Math.random() *4)+1) + "o.jpg";

//문학동네 표지를 만들어주는 스크립트//민음사 표지 제작 스크립트
console.log("열린책들");

//기본 캔버스 렌더링은 가로 1000을 기준으로 한다.

//타이틀 기본 폰트 크기
var defaultFontSize = 66;
var defaultCanvasWidth = 1000;
//캔버스 초기 세팅을 위한 함수

//커버이미지가 시작되는 좌표
var coverImageTop = 330;


//열린책들은 시리즈명을 표기하지 않음.

$("#title").val(book.title);
$("#originalTitle").val(book.originalTitle);
$("#author").val(book.author);
$("#translator").val(book.translator);

//열린책들 전용
$("#publisher").val("열린책들");
$("#oAuthor").val(book.oAuthor);

//열린책들 원제는 무조건 파란색 아니면 노란색이다.
//노란색 #FDCF00
//파란색 #365BAB

lColor = Math.floor(Math.random()*2)?"#FDCF00":"#365BAB";

function init() {
    canvas.clear();
    //커버이미지 기준선
    cCoverLine = new fabric.Line([0, 330, 1000, 330], {
        originY: 'bottom',
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
    });
    canvas.add(cCoverLine);

    cCover = new fabric.Rect({
        top: -1,
        left: -1,
        width: canvas.getWidth() + 1,
        height: coverImageTop + 1,
        fill: "#ffffff",
        selectable: false,
    });
    canvas.add(cCover);

    //커버이미지
    fabric.Image.fromURL(sCover, function (img) {
        var ratio;
        var orientation;
        if(img.getWidth() > img.getHeight())
        {
            console.log("가로가 세로보다 큼")
            ratio = img.getHeight() / (canvas.getHeight() - coverImageTop);
            orientation = false;
        }
        else{
            ratio = img.getWidth() / (canvas.getWidth());
            orientation = true;
        }
        //ratio = img.getHeight() / (canvas.getHeight() - coverImageTop);
        console.log("비율 : " + ratio);
        cCoverArt = img.set({
            left: -2,
            //width : 1000+1,
            //height : img.getHeight()*ratio+1,
            scaleX: img.scaleX / ratio,
            scaleY: img.scaleY / ratio,
            top: coverImageTop,
            originY: 'top',
            originX : 'left',
            pngCompression : 9,
            async : false,
        });
        
        if(orientation)
        {            
            var scale;
            if((canvas.getHeight()-coverImageTop) > cCoverArt.getHeight())
            {
                scale = (canvas.getHeight()-coverImageTop)/cCoverArt.getHeight();
                cCoverArt.setScaleX(cCoverArt.scaleX * scale);
                cCoverArt.setScaleY(cCoverArt.scaleY * scale);
            }

            console.log("세로이미지 : " + (canvas.getWidth()-cCoverArt.getWidth())/2+ 
            ","+ scale + 
            "," + (canvas.getHeight()-coverImageTop) + 
            "," + cCoverArt.getHeight() );
            cCoverArt.setTop(coverImageTop);
            
            }
//        else
//        {
//            var scale;
//            if(356 > cCoverArt.getHeight())
//            {
//                scale = 356/cCoverArt.getHeight();
//                cCoverArt.setScaleX(cCoverArt.scaleX * scale);
//                cCoverArt.setScaleY(cCoverArt.scaleY * scale);
//            }
//            console.log("가로이미지 : "+ (cCover.getWidth()-cCoverArt.getWidth())/2 + "," + scale);
//            cCoverArt.setLeft((cCover.getWidth()-cCoverArt.getWidth())/2);
//        }        
//        
        
        cCoverArt.setLeft(-(cCoverArt.getWidth()-canvas.getWidth())/2-2);
        if (cCoverArt.getHeight() > canvas.getHeight() - coverImageTop)
        {
            //cCoverArt.setTop((515 - cCoverArt.getHeight() - 1) / 2);
        }
        canvas.add(cCoverArt);
        cCoverArt.sendToBack();
        cCoverLine.sendToBack();
    });

    //타이틀
    cTitle = new fabric.Text($("#title").val(), {
        top: 75,
        left: 85,
        textAlign: "left",
        originX: "left",
        fill: "black",
        fontFamily: 'mj, batang',
        fontSize: 65,
        lineHeight: 1,
    });
    canvas.add(cTitle);
    titleAlign(cTitle.text);

    cOriginalTitle = new fabric.Text($("#originalTitle").val(), {
        //originX : "left",
        //originY : "center",
        top: cTitle.getTop() + cTitle.getBoundingRectHeight() + 30,
        left: 85,
        textAlign: "left",
        originX: "left",
        originY: "top",
        fill: lColor,
        fontFamily: 'mj, batang',
        fontSize: 30,
        selectable: true,
        lineHeight: 1,
    });
    canvas.add(cOriginalTitle);
    
    //저자
    cAuthor = new fabric.Text($("#author").val(), {
        top: coverImageTop - 20,
        fontFamily: 'nbg, dotum',
        fontSize: 20,
        fontWeight: 600,
        left: 85,
        textAlign: "left",
        originX: "left",
        originY: "bottom",
        lineHeight: 1,
        fill: "black",
    });
    canvas.add(cAuthor);

    //cOriginalTitle.bringToFront();

    //중간에 장르가 들어가야 할 것 같다.

    //번역자
    if ($("#translator").val() != "")
        cTranslator = new fabric.Text($("#translator").val() + " 옮김", {
            top: cAuthor.getTop(),
            left: cAuthor.getLeft() +cAuthor.getBoundingRectWidth() + 20,
            fontFamily: 'nbg, dotum',
            fontSize: 20,
            fontWeight : 100,
            textAlign: "left",
            originX: "left",
            originY: "bottom",
            fill: 'black',
            lineHeight: 1,
        });
    else
        cTranslator = new fabric.Text($("#translator").val(), {
            top: cAuthor.getTop(),
            left: cAuthor.getLeft() + cAuthor.getBoundingRectWidth() + 20,
            textAlign: "left",
            originX: "left",
            originY: "bottom",
            fill: "black",
            fontFamily: 'mj, batang',
            fontSize: 20,
            lineHeight: 1,
        });
    canvas.add(cTranslator);

    //출판사
    var mode = Math.floor(Math.random()*2);
    var position = Math.floor(Math.random()*2);
    cPublisher = new fabric.Text($("#publisher").val().substr(0,2) + "\n" + $("#publisher").val().substr(2,2), {
        top: canvas.getHeight()-80,
        left: position?85:canvas.getWidth()-85,
        //width : 80,
        textAlign: "left",
        originX: position?"left":"right",
        originY: "bottom",
        fill: mode?"#ffffff":"#000000",
        fontFamily: 'hanlasan',
        fontSize: 40,
        fontWeight : "bold",
        lineHeight: 1,
        backgroundColor : mode?"#000000":"#FFFFFF",
        scaleY : 1.5,
    });
    canvas.add(cPublisher);
    
    //상대위치로 위치가 결정되는 요소의 위치를 조정해줌.
    alignCover();
    
    //switchOutput();
}

init();


function titleAlign(value)
{
    cTitle.setText(value);
    //cTitle.setFontSize(defaultFontSize);
    cTitle.setScaleX(1);
    cTitle.setScaleY(1);
    console.log(cTitle.getBoundingRectWidth());
    //텍스트박스가 차지하고 있는 너비가 전체 캔버스 크기의 80%가 넘거나
    //텍스트 내에 개행문자가 있는 경우
    canvasWidth = canvas.getWidth();
    cTitle.setFontSize(defaultFontSize);
    chWidth = ( canvas.getWidth() * 0.8/(cTitle.getText().length) );

    console.log("텍스트 크기 : " + cTitle.getBoundingRectWidth() + "\n캔버스 크기 : "+canvas.getWidth() + "\n텍스트 너비 : " + cTitle.getWidth());
    //텍스트 너비가 캔버스너비보다 작고 계산된 타이틀 폰트 크기가 최대 폰트 크기보다 크면
    if(cTitle.getBoundingRectWidth() <  canvas.getWidth() * 0.8 && chWidth >=defaultFontSize)
    {
        //최대 폰트 크기를 유지해야 하므로 기본 설정된 폰트 크기로 설정한다.
        cTitle.setFontSize(defaultFontSize);
    }//텍스트 너비가 캔버스 너비보다 작고 계산된 타이틀 폰트 크기가 최대 폰트보다 작으면
    else if(cTitle.getBoundingRectWidth() <  canvas.getWidth() * 0.8 && chWidth < defaultFontSize)
    {
        cTitle.setFontSize(chWidth);
    }
    //텍스트 너비가 캔버스 너비보다 크고 계산된 폰트 크기가 기본 폰트의 80%보다는 크면 
    else if(cTitle.getBoundingRectWidth() >  canvas.getWidth() * 0.8 && chWidth > defaultFontSize*0.8)
    {
        //그냥 계산된 폰트 크기를 사용한다.
        cTitle.setFontSize(chWidth);
    }//텍스트 너비가 캔버스 너비보다 크고 계산된 폰트 크기가 기본 폰트의 80%보다 작으면
    else if(cTitle.getBoundingRectWidth() >  canvas.getWidth() * 0.8 && chWidth <defaultFontSize*0.8)
    {
        //폰트 크기를 기본 폰트의 80%로 맞추고 폰트 너비를 줄여 박스 크기에 맞춘다.
        //width = 0.9*(canvas.getWidth()* 0.9)/cTitle.getBoundingRectWidth();
        console.log("폰트 스케일 조정");
        console.log( canvas.getWidth() * 0.8+ " , "+ (cTitle.getText().length) + " , " +cTitle.getFontSize() )
        console.log((canvas.getWidth()* 0.8)/cTitle.getBoundingRectWidth());
        cTitle.setFontSize(defaultFontSize*0.8);
        //cTitle.setScaleX(1);
        var ratio = (canvas.getWidth()* 0.8)/cTitle.getBoundingRectWidth();
        if(ratio >= 1)
        {
            cTitle.setScaleX(1);
        }
        else
        {
            cTitle.setScaleX(ratio);
        }
        
        //cTitle.setWidth(canvas.getWidth() * 0.9*(canvas.getWidth()* 0.9)/cTitle.getBoundingRectWidth());
    }
    canvas.renderAll();
}
//값이 계속 변함 수정 필요
function drawCover(id, value) {
    switch (id) {
        case 'series':
            cSeries.setText(value + " " + sNumber);
            break;
        case 'title' :
            console.log("텍스트박스")
            titleAlign(value);
            alignCover();
            break;
        case 'originalTitle':
            cOriginalTitle.setText(value);
            break;
        case 'author':
            cAuthor.setText(value);
            alignCover();
            break;
        case 'translator':
            if (value != "")
                cTranslator.setText(value + " 옮김");
            else
                cTranslator.setText(value);
            alignCover();
            break;
        case 'publisher':
            value = value.replace(/\s/gi, '');
            value = value.substr(0,2) + "\n" + value.substr(2,2);
            cPublisher.setText(value);
            break;
        case 'oAuthor' :
            if(value == "")
                cOriginalTitle.setText($('#originalTitle').val());
            else
                cOriginalTitle.setText($("#oAuthor").val() + " : " + $('#originalTitle').val());
            break;

        default:
    }
}

function alignCover() {
    //원제와 저자/번역자 부분을 상대적으로 맞춰줘야 한다.
    
    cOriginalTitle.setTop(cTitle.getTop() + cTitle.getBoundingRectHeight() + 30);
    cTranslator.setLeft(cAuthor.getLeft() +cAuthor.getBoundingRectWidth() + 20);
}

var timerStarted = false;
var timer;
//폼에 이벤트를 걸어줌
$("#bcForm :input").bind('keyup',
        function () {
            if(GetCanvasAtResoution(defaultCanvasWidth, canvas))
            {
                drawCover(this.id, this.value);
            }
            GetCanvasAtResoution(500, canvas);
            canvas.renderAll();
            if(timerStarted == false){
                timerStarted = true;
                timer = setTimeout(function() {
                    console.log("타이머 실행");
                    imgOutput();
                    timerStarted = false;
                }, 2000);
            }
            else
            {
                clearTimeout(timer)
                timer = setTimeout(function() {
                    console.log("타이머 갱신");
                    imgOutput();
                    timerStarted = false;
                }, 2000);
            }
        }
);

//타이틀 폰트크기 조정 이벤트
$("#tSizeUp,#tSizeDown").bind('click',function(){
    if(this.id == "tSizeUp")
    {
        cTitle.setFontSize(cTitle.getFontSize() + 2);
    }
    else
    {
        cTitle.setFontSize(cTitle.getFontSize() -2 );
    }
    alignCover();
    canvas.renderAll();
});

$("#colorPicker").spectrum({
    color: lColor,
    showInput: true,
    className: "full-spectrum",
    //showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    localStorageKey: "spectrum.demo",
    move: function (color) {

    },
    show: function () {

    },
    beforeShow: function () {

    },
    hide: function (color) {
        hexColor = color.toHexString();
        $("#labalColor").css("background-color", color.toHexString()).val(color.toHexString());
        cOriginalTitle.setFill(color.toHexString());
        canvas.renderAll();
        imgOutput();
    },
    change: function (color) {
        hexColor = color.toHexString();
        $("#labalColor").css("background-color", color.toHexString()).val(color.toHexString());
        cOriginalTitle.setFill(color.toHexString());
        canvas.renderAll();
        imgOutput();
    },
    palette: [
        ["#ffffff", "#fff7de", "#ffffce", "#ffffbd", "#ffffd6", "#b5ff84", "#c6efde", "#efffff", "#efe7f7", "#dea5d6"],
        ["#ded6c6", "#ffc6bd", "#ffe7b5", "#ffe7a5", "#efef7b", "#adf77b", "#5abd9c", "#a5d6f7", "#8494e7", "#ef7be7"],
        ["#cec6b5", "#e78473", "#efad52", "#f7b500", "#efef9c", "#a5ff00", "#7bd6bd", "#a5d6de", "#8c5ae7", "#de6bce"],
        ["#8c8473", "#ef0018", "#ef4210", "#f79400", "#ffff00", "#63d600", "#a5c684", "#5a63d6", "#7b52c6", "#c642ce"],
        ["#736b63", "#d60039", "#d67310", "#f7844a", "#f7de00", "#429400", "#4a944a", "#4200ff", "#9c00de", "#a500c6"],
        ["#39524a", "#b51821", "#944a08", "#a55229", "#8c8c00", "#318c00", "#429484", "#3100c6", "#523984", "#940084"],
        ["#000000", "#940008", "#840008", "#ad2929", "#637321", "#296b00", "#29006b", "#21007b", "#52007b", "#84007b"],
        ["#FDCF00", "#365BAB"],
    ]
});


//크롬 브라우저에서 웹폰트가 바로 적용되지 않는 문제가 있어 그것을 갱신해주는 코드
setTimeout(function () {
    var agent = navigator.userAgent.toLowerCase();
    //크롬에서 제대로 렌더링이 안돼는 문제가 있어서 크롬 판정 코드 삽입.
    //
    //엣지브라우저가 크롬 에이전트를 가져다 쓰므로 엣지 판정 코드도 삽입
    if ((agent.indexOf("applewebkit") != -1) && (agent.indexOf("edge") == -1)) {
    } else
    {
    }
    //init();
    canvas.renderAll();
    switchOutput();
}, 1000);

//이미지 로딩이 늦어서 타이밍이 맞지 않는 부분이 있어 캔버스에 오브젝트가 다 로딩됐는지 확인하고 캔버스 사이즈 조정
canvasSet = setInterval(function() {
    if(canvas.getObjects().length == 8){
        clearInterval(canvasSet);
        //인장이 제대로 세팅되지 않아서 이쪽으로 배치
        var value = $("#publisher").val().substr(0,2) + "\n" + $("#publisher").val().substr(2,2);
        cPublisher.setText(value);
        alignCover();
        GetCanvasAtResoution(500, canvas);
        switchOutput();
        clearInterval(this);
        console.log('중지');
    }
 }, 100);
 
 //커버아트 파일 불러오기
 $(document).ready(function () {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader(); //파일을 읽기 위한 FileReader객체 생성
            reader.onload = function (e) {
                //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
                console.log("읽기 성공");
                console.log(e);
                var imgObj = new Image();
                imgObj.src = event.target.result;
                imgObj.onload = function () {
                    cCoverArt.remove();
                    console.log("비율 : " + ratio);
                    cCoverArt = new fabric.Image(imgObj);

                    var ratio;
                    var orientation;
                    if(cCoverArt.getWidth() > cCoverArt.getHeight())
                    {
                        console.log("가로가 세로보다 큼")
                        ratio = cCoverArt.getHeight() / (canvas.getHeight() - coverImageTop);
                        orientation = false;
                    }
                    else{
                        ratio = cCoverArt.getWidth() / (canvas.getWidth());
                        orientation = true;
                    }                    
                    cCoverArt.set({
                        left: -2,
                        //width : 1000+1,
                        //height : img.getHeight()*ratio+1,
                        scaleX: cCoverArt.scaleX / ratio,
                        scaleY: cCoverArt.scaleY / ratio,
                        top: coverImageTop,
                        originY: 'top',
                        originX : 'left',
                        pngCompression : 9,
                        async : false,
                    });
                    
                    if(orientation)
                    {            
                        var scale;
                        if((canvas.getHeight()-coverImageTop) > cCoverArt.getHeight())
                        {
                            scale = (canvas.getHeight()-coverImageTop)/cCoverArt.getHeight();
                            cCoverArt.setScaleX(cCoverArt.scaleX * scale);
                            cCoverArt.setScaleY(cCoverArt.scaleY * scale);
                        }

                        console.log("세로이미지 : " + (canvas.getWidth()-cCoverArt.getWidth())/2+ 
                        ","+ scale + 
                        "," + (canvas.getHeight()-coverImageTop) + 
                        "," + cCoverArt.getHeight() );
                        cCoverArt.setTop(coverImageTop);
                    }
            //        else
            //        {
            //            var scale;
            //            if(356 > cCoverArt.getHeight())
            //            {
            //                scale = 356/cCoverArt.getHeight();
            //                cCoverArt.setScaleX(cCoverArt.scaleX * scale);
            //                cCoverArt.setScaleY(cCoverArt.scaleY * scale);
            //            }
            //            console.log("가로이미지 : "+ (cCover.getWidth()-cCoverArt.getWidth())/2 + "," + scale);
            //            cCoverArt.setLeft((cCover.getWidth()-cCoverArt.getWidth())/2);
            //        }        
//        
                    
                    cCoverArt.setLeft((canvas.getWidth()-cCoverArt.getWidth())/2-2);
                    
                    canvas.add(cCoverArt);
                    cCoverArt.sendToBack();
                    cCoverLine.sendToBack();
                    canvas.renderAll();
                    imgOutput();
                }
            }
            reader.readAsDataURL(input.files[0]);
            //File내용을 읽어 dataURL형식의 문자열로 저장
        }
    }//readURL()-- 
    //file 양식으로 이미지를 선택(값이 변경) 되었을때 처리하는 코드
    $("#coverFileInput").change(function () {
        
        if(GetCanvasAtResoution(defaultCanvasWidth, canvas))
        {
            readURL(this);
        } 
        canvasSet = setInterval(function() {
            if(canvas.getObjects().length == 8){
                console.log("조정중");
                clearInterval(canvasSet);
                GetCanvasAtResoution(500, canvas);
            }
        }, 100);

        canvas.renderAll();
    });
});