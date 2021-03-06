//민음사 표지 제작 스크립트

//타이틀 기본 폰트 크기
var defaultFontSize = 50;

$("#series").val("세계문학전집");
$("#title").val(book.title);
$("#originalTitle").val(book.originalTitle);
$("#author").val(book.author);
$("#translator").val(book.translator);
$("#publisher").val("민음사");
$("#sNumber").val(sNumber);


//캔버스 초기 세팅을 위한 함수
function init() {
    canvas.clear();
    //커버이미지 기준선
    cCoverLine = new fabric.Line([0, 355, 500, 355], {
        originY: 'bottom',
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
    });
    canvas.add(cCoverLine);

    cCover = new fabric.Rect({
        top: 355,
        left: -1,
        width: canvas.getWidth() + 1,
        height: canvas.getHeight() - 355 + 1,
        fill: "white",
        selectable: false,
    });
    canvas.add(cCover);

    //커버이미지
    fabric.Image.fromURL(sCover, function (img) {
        var ratio;
        //이미지 방향
        var orientation;        
        if(img.getWidth() > img.getHeight())
        {
            console.log("가로가 세로보다 큼");
            ratio = img.getWidth() / (canvas.getWidth());
            //ratio = img.getHeight() / 356;
            orientation = false;
        }
        else{
            ratio = img.getWidth() / (canvas.getWidth());
            orientation = true;
        }
        //ratio = img.getWidth() / canvas.getWidth();
        console.log("민음사 : " +ratio);
        console.log(img.getWidth());
        cCoverArt = img.set({
            left: -1,
            top: -1,
            //height: 355 + 1,
            //width: (ratio > 1) ? (img.getWidth() / ratio + 1) : (img.getWidth() * ratio + 1),
            scaleX: img.scaleX / ratio,
            scaleY: img.scaleY / ratio,
        });
        if(orientation)
        {
            console.log("세로이미지 : " + (cCover.getWidth()-cCoverArt.getWidth())/2);
            cCoverArt.setTop((356-cCoverArt.getHeight())/2);
        }
        else
        {
            var scale;
            if(356 > cCoverArt.getHeight())
            {
                scale = 356/cCoverArt.getHeight();
                cCoverArt.setScaleX(cCoverArt.scaleX * scale);
                cCoverArt.setScaleY(cCoverArt.scaleY * scale);
            }
            console.log("가로이미지 : "+ (cCover.getWidth()-cCoverArt.getWidth())/2 + "," + scale);
            cCoverArt.setLeft((cCover.getWidth()-cCoverArt.getWidth())/2);
        }
        
        
        console.log(cCoverArt.width);
        canvas.add(cCoverArt);
        cCoverArt.sendToBack();
        cCoverLine.sendToBack();
    });

    //시리즈명
    cSeries = new fabric.Text($("#series").val() +" "+ $("#sNumber").val(), {
        left: 40,
        top: 380,
        fontFamily: 'SungDongGothic',
        fontSize: 15,
        scaleX: 0.9,
    });
    canvas.add(cSeries);
    //타이틀
    cTitle = new fabric.Text($("#title").val(), {
        top: 460,
        left: 30,
        fontFamily: 'mj, batang',
        fontSize: defaultFontSize,
    });
    canvas.add(cTitle);

    //타이틀 상단 라인
    cLabelU = new fabric.Rect({
        top: 410,
        left: 30,
        width: cTitle.getBoundingRectWidth(), //임시
        height: 30,
        fill: lColor,
        selectable: false,
    });
    canvas.add(cLabelU);
    //타이틀 하단 라인
    cLabelD = new fabric.Rect({
        originX: 'left',
        originY: 'top',
        top: cLabelU.top + 130,
        left: 30,
        width: cLabelU.width,
        height: cLabelU.height,
        fill: cLabelU.fill,
        selectable: false,
    });
    canvas.add(cLabelD);
    //입력된 타이틀을 2줄로 분할할 것인지,크기조정을 할 것인지 조정해준다.
    titleSplit(cTitle.text);

    cOriginalTitle = new fabric.Text($("#originalTitle").val(), {
        //originX : "left",
        originY: "center",
        top: cLabelD.top + cLabelD.height / 2 + 2,
        left: cLabelD.left + 12,
        fill: "white",
        fontFamily: 'nbg',
        fontSize: cLabelD.height * 0.4,
        selectable: false,
    });
    canvas.add(cOriginalTitle);
    cOriginalTitle.bringToFront();

    //저자
    cAuthor = new fabric.Text($("#author").val(), {
        top: cLabelD.top + cLabelD.height + 15,
        left: 40,
        fontFamily: 'nbg',
        fontSize: 15,
    })
    canvas.add(cAuthor);
    //번역자
    if ($("#translator").val() != "")
        cTranslator = new fabric.Text($("#translator").val() + " 옮김", {
            top: cAuthor.top + cAuthor.fontSize * 0.3,
            left: cAuthor.left + cAuthor.getBoundingRectWidth() + 10,
            fontFamily: 'nbg',
            fontSize: cAuthor.fontSize * 0.7,
        });
    else
        cTranslator = new fabric.Text($("#translator").val(), {
            top: cAuthor.top + cAuthor.fontSize * 0.3,
            left: cAuthor.left + cAuthor.getBoundingRectWidth() + 10,
            fontFamily: 'nbg',
            fontSize: cAuthor.fontSize * 0.7,
        });
    canvas.add(cTranslator);
    //출판사
    cPublisher = new fabric.Text($("#publisher").val(), {
        top: 795,
        left: 30,
        fontFamily: 'SungDongGothicB',
        fontSize: 20,
    });
    canvas.add(cPublisher);
    
    //상대위치로 위치가 결정되는 요소의 위치를 조정해줌.
    alignCover();
    
    switchOutput();    
}

init();

//크롬 브라우저에서 웹폰트가 바로 적용되지 않는 문제가 있어 그것을 갱신해주는 코드
setTimeout(function () {
    canvas.renderAll();
    //크롬에서 제대로 렌더링이 안돼는 문제가 있어서 크롬 판정 코드 삽입.
    //엣지브라우저가 크롬 에이전트를 가져다 쓰므로 엣지 판정 코드도 삽입
    if ((uAgent.indexOf("applewebkit") != -1) && (uAgent.indexOf("edge") == -1)) {
        cSeries.setText(cSeries.text);
        cTitle.setText(cTitle.text);
        cAuthor.setText(cAuthor.text);
        cTranslator.setText(cTranslator.text);
        labelWidth(cTitle.getBoundingRectWidth());
        cTranslator.left = cAuthor.left + cAuthor.getBoundingRectWidth() + 10;
        alignCover();
        canvas.renderAll();
    } else
    {
        console.log("크롬 아님");
    }
    imgOutput();

}, 2500);

function titleSplit(value)
{
    cTitle.setText(value);
    cTitle.setFontSize(defaultFontSize);
    cTitle.setScaleX(1);
    console.log(cTitle.getBoundingRectWidth());
    if (cTitle.getBoundingRectWidth() > canvas.getWidth() * 0.75 || cTitle.getText().search(/[\n|\r]/) > 0)
    {
        cTitle.setFontSize(defaultFontSize * 0.74);
        labelWidth(cTitle.getBoundingRectWidth());
        console.log(cTitle.getBoundingRectWidth());
        if (cTitle.getBoundingRectWidth() > canvas.getWidth() * 0.75)
        {
            splitPoint = value.length * (370 / cTitle.getBoundingRectWidth())
            if (splitPoint < value.length / 2)
            {
                splitPoint = value.length - splitPoint;
            }
            console.log(splitPoint);
            var t1 = value.substr(0, splitPoint);
            var t2 = value.substr(splitPoint, value.length).replace(/^\s+/, "");
            cTitle.setFontSize(defaultFontSize * 0.6);
            cTitle.setText(t1 + "\n" + t2);
            labelWidth(cTitle.getBoundingRectWidth());
        }
        if (cTitle.getBoundingRectWidth() > canvas.getWidth() * 0.75)
        {
            labelWidth(canvas.getWidth() * 0.75);
            var t1 = value.substr(0, value.length / 2);
            var t2 = value.substr(value.length / 2, value.length).replace(/^\s+/, "");
            cTitle.setFontSize(defaultFontSize * 0.6);
            cTitle.setText(t1 + "\n" + t2);
            cTitle.setScaleX(370 / cTitle.getBoundingRectWidth());
        }
    } else
    {
        cTitle.setFontSize(defaultFontSize);
        cTitle.setText(value);
        labelWidth(cTitle.getBoundingRectWidth());
    }
    canvas.renderAll();
}
//값이 계속 변함 수정 필요
function drawCover(id, value) {
    switch (id) {
        case 'series':
            cSeries.setText(value + " " + $('#sNumber').val());
            break;
        case 'sNumber':
            cSeries.setText($('#series').val() + " " + value);
            break;
        case 'title' :
            titleSplit(value);
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
            cPublisher.setText(value);
    }
}
//들어온 길이에 맞춰서 라벨 길이를 조정해주는 함수
function labelWidth(lWidth) {
    cLabelU.width = lWidth;
    cLabelD.width = lWidth;
}

function alignCover() {
    cLabelD.setTop(cTitle.getTop() + cTitle.getBoundingRectHeight() + 20);
    cAuthor.setTop(cLabelD.top + cLabelD.height + 15);
    cTranslator.setTop(cAuthor.top + cAuthor.fontSize * 0.3);
    cTranslator.setLeft(cAuthor.left + cAuthor.getBoundingRectWidth() + 10);
    cOriginalTitle.setTop(cLabelD.top + cLabelD.height / 2 + 2);
}

var timerStarted = false;
var timer;
//폼에 이벤트를 걸어줌
$("#bcForm :text").bind('keyup',
        function () {
            drawCover(this.id, this.value);
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
                clearTimeout(timer);
                timer = setTimeout(function() {
                    console.log("타이머 갱신");
                    imgOutput();
                    timerStarted = false;
                }, 2000);
            }
        }
);



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
                    cCoverArt = new fabric.Image(imgObj);
                    var ratio
                    //이미지 방향 확인
                    var orientation;
                    if(cCoverArt.getWidth() > cCoverArt.getHeight())
                    {
                        console.log("가로가 세로보다 큼");
                        ratio = cCoverArt.getWidth() / (canvas.getWidth());
                        orientation = false;
                    }
                    else{
                        ratio = cCoverArt.getWidth() / (canvas.getWidth());
                        orientation = true;
                    }
                    //ratio = cCoverArt.getWidth() / canvas.getWidth();
                    //cCoverArt.setSourcePath(image);
                    cCoverArt.set({
                        left: -1,
                        top: -1,
                        scaleX: cCoverArt.scaleX / ratio,
                        scaleY: cCoverArt.scaleY / ratio,
                        //height: 355 + 1,
                        //width: 356 / cCoverArt.getHeight() * cCoverArt.getWidth() + 1,
                        //width : (ratio >1)?(cCoverArt.getWidth()/ratio+1):(cCoverArt.getWidth()*ratio+1),
                    });
                    if(orientation)
                    {
                        console.log("세로이미지 : " + (cCover.getWidth()-cCoverArt.getWidth())/2);
                        cCoverArt.setTop((356-cCoverArt.getHeight())/2);
                    }
                    else
                    {
                        var scale;
                        if(356 > cCoverArt.getHeight())
                        {
                            scale = 356/cCoverArt.getHeight();
                            cCoverArt.setScaleX(cCoverArt.scaleX * scale);
                            cCoverArt.setScaleY(cCoverArt.scaleY * scale);
                        }
                        console.log("가로이미지 : "+ (cCover.getWidth()-cCoverArt.getWidth())/2 + "," + scale);
                        cCoverArt.setLeft((cCover.getWidth()-cCoverArt.getWidth())/2);
                    }
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
        readURL(this);
    });
});

$("#colorPicker").spectrum({
    color: cLabelU.getFill(),
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
    hide: function () {
        hexColor = color.toHexString();
        console.log(hexColor);
        $("#labalColor").css("background-color", color.toHexString()).val(color.toHexString());
        cLabelU.setFill(color.toHexString());
        cLabelD.setFill(color.toHexString());
        var hsv = color.toHsv();
        console.log(hsv);
        if ((hsv.s <= 0.4 && hsv.v > 0.9))
            cOriginalTitle.setFill("black");
        else if (hsv.h > 50 && hsv.h <= 180 && hsv.s == 1 && hsv.v == 1)
            cOriginalTitle.setFill("black");
        else
            cOriginalTitle.setFill("white");
        canvas.renderAll();
        imgOutput();
    },
    change: function (color) {
        hexColor = color.toHexString();
        console.log(hexColor);
        $("#labalColor").css("background-color", color.toHexString()).val(color.toHexString());
        cLabelU.setFill(color.toHexString());
        cLabelD.setFill(color.toHexString());
        var hsv = color.toHsv();
        console.log(hsv);
        if ((hsv.s <= 0.4 && hsv.v > 0.9))
            cOriginalTitle.setFill("black");
        else if (hsv.h > 50 && hsv.h <= 180 && hsv.s == 1 && hsv.v == 1)
            cOriginalTitle.setFill("black");
        else
            cOriginalTitle.setFill("white");
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
        ["#000000", "#940008", "#840008", "#ad2929", "#637321", "#296b00", "#29006b", "#21007b", "#52007b", "#84007b"]
    ]
});
