//문학동네 표지를 만들어주는 스크립트//민음사 표지 제작 스크립트
console.log("문학동네");
//타이틀 기본 폰트 크기
var defaultFontSize = 66;
var defaultCanvasWidth = 500;
//캔버스 초기 세팅을 위한 변수
var coverImageHeight = 515;
//표지위에 써있는 문자열
var cCoverLetter;
//문학동네 표지는 원제와 저자를 가지고 레터링을 하는데 그걸 하기는 어려우니까 의미없는 문자열로 대체
var unmeaningStrings = "Lorem ipsum dolo\nsit amet, consectetur\nadipiscing elit.\nNulla a justo ac ligula\nvulputate convallis\nvitae ac nulla. Curabitur aliquet maximus venenatis. Proin eu placerat est. Maecenas et felis dignissim, vestibulum dolor quis, lobortis nisi. Fusce ac malesuada leo. Suspendisse scelerisque eros nibh, nec volutpat neque dignissim eget. Pellentesque sit amet tortor a purus rutrum egestas. Morbi egestas ante ut dignissim condimentum. Nam mauris dolor, vehicula ornare quam id, rhoncus blandit massa. Maecenas nec sapien at nunc varius volutpat.";

var cSeriesBox;

$("#series").val("세계문학전집");
$("#title").val(book.title);
$("#originalTitle").val(book.originalTitle);
$("#author").val(book.author);
$("#translator").val(book.translator);

//문학동네 전용
$("#publisher").val("문학동네");
$("#oAuthor").val(book.oAuthor);
$("#sNumber").val(sNumber);

//표지 바탕색이 어두운 색이므로 라벨컬러가 밝은색이어야 한다
//파란색 계열일 경우 바탕색때문에 잘 안보이므로 자동선택에서는 제외.
do{
    hsl = hexToHsl(lColor);
    if((hsl[2] > 50) && (hsl[0] < 200 || hsl[0] > 280) )
        break;
    lColor = randomColor();
}while(1);

function init() {
    canvas.clear();
    //커버이미지 기준선
    cCoverLine = new fabric.Line([0, 515, 1000, 515], {
        originY: 'bottom',
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
    });
    canvas.add(cCoverLine);


    cCover = new fabric.Rect({
        top: coverImageHeight,
        left: -1,
        width: canvas.getWidth() + 1,
        height: canvas.getHeight() - coverImageHeight + 1,
        fill: "#221816",
        selectable: false,
    });
    canvas.add(cCover);

    //커버를 덮을 텍스트
    cCoverLetter = new fabric.Text(unmeaningStrings, {
        top: coverImageHeight + 3,
        left: -1,
        width: canvas.getWidth() + 1,
        height: canvas.getHeight() - coverImageHeight + 1,
        fontSize: 180,
        lineHeight: 0.9,
        fontFamily: 'Fjalla One, sans-serif',
        fill: "#3F3B3A",
        selectable: true,
    });
    canvas.add(cCoverLetter);

    //커버이미지
    fabric.Image.fromURL(sCover, function (img) {
        ratio = img.getWidth() / canvas.getWidth();
        console.log("비율 : " + ratio);
        cCoverArt = img.set({
            left: -1,
            top: -1,
            //width : 1000+1,
            //height : img.getHeight()*ratio+1,
            scaleX: img.scaleX / ratio,
            scaleY: img.scaleY / ratio,
        });
        if (cCoverArt.getHeight() > coverImageHeight)
        {
            cCoverArt.setTop((515 - cCoverArt.getHeight() - 1) / 2);
        }
        console.log(515 - cCoverArt.getHeight() - 1);
        canvas.add(cCoverArt);
        cCoverArt.sendToBack();
        cCoverLine.sendToBack();
    });

    //시리즈 앞 박스
    cSeriesBox = new fabric.Rect({
        top: 40,
        left: 50,
        width: 10,
        height: 40,
        fill: lColor,
        selectable: false,
    });
    canvas.add(cSeriesBox);
    console.log("박스너비" + cSeriesBox.getBoundingRectWidth());

    //시리즈명
    cSeries = new fabric.Text($("#series").val() + "\n" + $("#sNumber").val(), {
        left: cSeriesBox.getLeft() + cSeriesBox.getBoundingRectWidth() + 5,
        top: cSeriesBox.getTop(),
        fontFamily: 'nbg, Arial',
        fontSize: 17,
        fontWeight: '600',
        fill: 'black',
        OriginX: 'left',
        //stroke: 'white',
        //strokeWidth: 0.1
    });
    canvas.add(cSeries);

    //타이틀
    cTitle = new fabric.Text($("#title").val(), {
        top: 840,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        fill: "white",
        fontFamily: 'mj, batang',
        fontSize: 66,
        lineHeight: 1,
    });
    canvas.add(cTitle);
    //titleSplit(cTitle.text);

    //저자
    cAuthor = new fabric.Text($("#author").val(), {
        top: cTitle.getTop() - 50,
        fontFamily: 'mj, batang',
        fontSize: 40,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        originY: "bottom",
        lineHeight: 1,
        fill: lColor,
        lineHeight : 1,
    });
    canvas.add(cAuthor);

    cOriginalTitle = new fabric.Text($("#originalTitle").val(), {
        //originX : "left",
        //originY : "center",
        top: cAuthor.getTop() - cAuthor.getFontSize() - 50,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        originY: "bottom",
        fill: "white",
        fontFamily: 'mj, batang',
        fontSize: 18,
        selectable: false,
        lineHeight: 1,
    });
    canvas.add(cOriginalTitle);
    //cOriginalTitle.bringToFront();

    //번역자
    if ($("#translator").val() != "")
        cTranslator = new fabric.Text($("#translator").val() + " 옮김", {
            top: cTitle.getTop() + cTitle.getBoundingRectHeight() + 45,
            left: canvas.getWidth() / 2,
            textAlign: "center",
            originX: "center",
            originY: "top",
            fill: lColor,
            fontFamily: 'mj, batang',
            fontSize: 22,
            lineHeight: 1,
        });
    else
        cTranslator = new fabric.Text($("#translator").val(), {
            top: cTitle.getTop() + cTitle.getBoundingRectHeight() + 50,
            left: canvas.getWidth() / 2,
            textAlign: "center",
            originX: "center",
            originY: "top",
            fill: lColor,
            fontFamily: 'mj, batang',
            fontSize: 22,
            lineHeight: 1,
        });
    canvas.add(cTranslator);

    //출판사
    cPublisher = new fabric.Text($("#publisher").val(), {
        top: canvas.getHeight() - 75,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        originY: "bottom",
        fontFamily: 'SungDongGothicB',
        fontSize: 28,
        fill: "white",
    });
    canvas.add(cPublisher);
    
    if($("#oAuthor").val() != "")
    {
        cOriginalTitle.setText($("#oAuthor").val() + " : " + cOriginalTitle.getText());
    }
    
    //상대위치로 위치가 결정되는 요소의 위치를 조정해줌.
    alignCover();
    titleAlign(cTitle.text);
    GetCanvasAtResoution(defaultCanvasWidth, canvas);

}

init();



function titleAlign(value)
{
    cTitle.setText(value);
    cTitle.setFontSize(defaultFontSize);
    //cTitle.setScaleX(1);
    console.log(cTitle.getBoundingRectWidth());
    //텍스트박스가 차지하고 있는 너비가 전체 캔버스 크기의 80%가 넘거나
    //텍스트 내에 개행문자가 있는 경우
    canvasWidth = canvas.getWidth();
    if (cTitle.getBoundingRectWidth() > canvasWidth * 0.8 || cTitle.getText().search(/[\n|\r]/) > 0)
    {
        //cTitle.setFontSize(defaultFontSize * 0.9);
        console.log(cTitle.getBoundingRectWidth());
        //개행문자가 있는데도(2줄이상인데도) 너비가 80%를 넘는다.
        if (cTitle.getBoundingRectWidth() > canvasWidth * 0.8)
        {
            splitPoint = value.length * ((canvasWidth*0.8) / cTitle.getBoundingRectWidth())
            if (splitPoint < value.length / 2)
            {
                splitPoint = value.length - splitPoint;
            }
            console.log(splitPoint);
            var t1 = value.substr(0, splitPoint);
            var t2 = value.substr(splitPoint, value.length).replace(/^\s+/, "");
            //cTitle.setFontSize(defaultFontSize * 0.6);
            cTitle.setText(t1 + "\n" + t2);
        }
        if (cTitle.getBoundingRectWidth() > canvasWidth * 0.8)
        {
            var t1 = value.substr(0, value.length / 2);
            var t2 = value.substr(value.length / 2, value.length).replace(/^\s+/, "");
            //cTitle.setFontSize(defaultFontSize * 0.6);
            cTitle.setText(t1 + "\n" + t2);
            //cTitle.setScaleX(370 / cTitle.getBoundingRectWidth());
        }
    } else
    {
        cTitle.setFontSize(defaultFontSize);
        cTitle.setText(value);
    }
    alignCover();
    canvas.renderAll();
}
//값이 계속 변함 수정 필요
function drawCover(id, value) {
    switch (id) {
        case 'series':
            cSeries.setText(value + "\n" + $("#sNumber").val());
            break;
        case 'sNumber' :
            cSeries.setText($('#series').val() + "\n" + value);
            break;
        case 'title' :
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
            cPublisher.setText(value);
        case 'oAuthor' :
            if(value == "")
                cOriginalTitle.setText($('#originalTitle').val());
            else
                cOriginalTitle.setText($("#oAuthor").val() + " : " + $('#originalTitle').val());

        default:
    }
}

function alignCover() {
    //옮긴이만 상대적으로 맞춰주면 된다.
    cTranslator.setTop(cTitle.getTop() + cTitle.getBoundingRectHeight() + 45);
}

//폼에 이벤트를 걸어줌
$("#bcForm :input").bind('keyup',
        function () {
            GetCanvasAtResoution(defaultCanvasWidth, canvas);
            drawCover(this.id, this.value);
            GetCanvasAtResoution(500, canvas);
            canvas.renderAll();
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
                    
                    cCoverArt = new fabric.Image(imgObj);
                    var ratio = cCoverArt.getWidth() / canvas.getWidth();
                    console.log("비율 : " + ratio);
                    cCoverArt.set({
                        left: -2,
                        top: -1,
                        //width : 1000+1,
                        //height : img.getHeight()*ratio+1,
                        scaleX: cCoverArt.scaleX / ratio*1.01,
                        scaleY: cCoverArt.scaleY / ratio*1.01,
                        pngCompression : 9,
                        async : false,
                    });
                    cCoverArt.setLeft(-(cCoverArt.getWidth()-canvas.getWidth())/2-2);
                    cCoverArt.setTop(-(cCoverArt.getHeight()-coverImageHeight)/2-2);
                    console.log("커버아트top : " + cCoverArt.getTop());
                    canvas.add(cCoverArt);
                    cCoverArt.sendToBack();
                    cCoverLine.sendToBack();
                    canvas.renderAll();
                }
            }
            reader.readAsDataURL(input.files[0]);
            //File내용을 읽어 dataURL형식의 문자열로 저장
        }
    }//readURL()-- 
    //file 양식으로 이미지를 선택(값이 변경) 되었을때 처리하는 코드
    $("#coverFileInput").change(function () {
        
        if(GetCanvasAtResoution(1000, canvas))
        {
            readURL(this);
        } 
        canvasSet = setInterval(function() {
            if(canvas.getObjects().length ==11){
                console.log("조정중");
                clearInterval(canvasSet);
                GetCanvasAtResoution(500, canvas);
            }
        }, 100);

        canvas.renderAll();
    });
});

$("#colorPicker").spectrum({
    color: cSeriesBox.getFill(),
    showInput: true,
    className: "full-spectrum",
    //showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    //localStorageKey: "spectrum.demo",
    move: function (color) {

    },
    show: function () {

    },
    beforeShow: function () {

    },
    hide: function (color) {
        cSeriesBox.setFill(color.toHexString());
        cAuthor.setFill(color.toHexString());
        cTranslator.setFill(color.toHexString());
        canvas.renderAll();
    },
    change: function (color) {
        cSeriesBox.setFill(color.toHexString());
        cAuthor.setFill(color.toHexString());
        cTranslator.setFill(color.toHexString());
        canvas.renderAll();
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

$("#seriesColor").spectrum({
    color: cSeries.getFill(),
    showInput: true,
    className: "full-spectrum",
    //showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    //localStorageKey: "spectrum.demo",
    move: function (color) {

    },
    show: function () {

    },
    beforeShow: function () {

    },
    hide: function (color) {
        console.log("숨김");
        cSeries.setFill(color.toHexString());
        canvas.renderAll();
    },
    change: function (color) {
        console.log("바뀜");
        cSeries.setFill(color.toHexString());
        canvas.renderAll();
    },
    palette: [
        ["#ffffff", "#000000"]
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
    //imgOutput();
}, 1000);