// 즉시 실행함수 선언
// 전역 변수 사용을 피하기 위해서 사용

(() => {

  let yOffset = 0; // window.scrollY 대신 사용할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.1;
  let delayedYOffset = 0;
  let animationId = null;
  let rafState;

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      scrollHeight: 0, // 사용자가 어떠한 디바이스로 열지 모르겠읜, 스크린 높이의 배수로 해주기 위함
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext('2d'),
        videoImages: []
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1}],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],
        messageB_translateY_in: [20, 0, {start: 0.3, end: 0.4}],
        messageC_translateY_in: [20, 0, {start: 0.5, end: 0.6}],
        messageD_translateY_in: [20, 0, {start: 0.7, end: 0.8}],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3}],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5}],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7}],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9}],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3}],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5}],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7}],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9}],
      }
    },
    {
      // 1
      type: 'normal',
      scrollHeight: 0,
      // heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description')
      }
    },
    {
      // 2
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext('2d'),
        videoImages: []
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1}],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1}],
        messageA_opacity_in: [0, 1, {start: 0.15, end: 0.2}],
        messageB_opacity_in: [0, 1, {start: 0.6, end: 0.65}],
        messageC_opacity_in: [0, 1, {start: 0.87, end: 0.92}],
        messageA_translateY_in: [20, 0, {start: 0.15, end: 0.2}],
        messageB_translateY_in: [30, 0, {start: 0.6, end: 0.65}],
        messageC_translateY_in: [30, 0, {start: 0.87, end: 0.92}],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45}],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73}],
        messageC_opacity_out: [1, 0, { start: 0.91, end: 1}],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45}],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73}],
        messageC_translateY_out: [0, -20, { start: 0.91, end: 1}],
        pinB_scaleY: [0.5, 1, {start: 0.6, end: 0.65}],
        pinC_scaleY: [0.5, 1,  {start: 0.87, end: 0.92}],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55}],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77}],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63}],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9}],
      }
    },
    {
      // 3
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),

        imagesPath: [
          "../images/blend-image-1.jpg",
          "../images/blend-image-2.jpg",
        ],
        images: []
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [ 0, 0, { start: 0, end: 0}],
        blendHeight: [ 0, 0, { start: 0, end: 0}],
        canvasCaption_opacity: [0, 1, {start: 0, end: 0}],
        canvasCaption_translateY: [20, 1, {start: 0, end: 0}],
        rectStartY: 0,
      }
    },
  ];

  function setCanvasImages() {
    let imgElem;

    for(let i = 0; i< sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image() // document.createElement('img')
      imgElem.src = `../video/001/IMG_${ 6726 + i }.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem)
    }

    let imgElem2;

    for(let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = new Image() // document.createElement('img')
      imgElem2.src = `../video/002/IMG_${ 7027 + i }.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2)
    }

    let imgElem3;
    for(let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imgElem3 = new Image()
      imgElem3.src = sceneInfo[3].objs.imagesPath[i]
      sceneInfo[3].objs.images.push(imgElem3)
    }
  }

  function checkMenu() {
    if(yOffset > 44) {
      document.body.classList.add("local-nav-sticky")
    }else{
      document.body.classList.remove("local-nav-sticky")
    }
  }

  function setLayout() {

    //각 스크롤 섹션의 높이를 셋팅

    for(let i = 0; i < sceneInfo.length; i++) {
      if(sceneInfo[i].type === 'sticky'){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }else if(sceneInfo[i].type === 'normal'){
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }


    // load or refresh 되었을 때, 사용자가 바라보고 있는 화면을 잡아내기 위해서
    let totalScrollHeight = 0
    for(let i = 0; i< sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      // window.scrollY 를 사용해야 정상동작한다.
      if(totalScrollHeight >= window.scrollY) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`)

    // 원해 캔버스의 높이 1080과 실제 화면의 높이를 비교한다.
    const heightRatio = window.innerHeight / 1080
    // translate을 먼저해주어야 한다. 그래서 scale이 움직인다.
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
  }

  function calcValues(values, currentYOffset) {
    // 각 섹션마다 얼마나 스크롤이 되었는지가 중요하다
    let rv;
    // 현재 스크롤 섹션에서 스크롤된 비율 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight
    const scrollRatio = currentYOffset / scrollHeight;
    // 얼만큼 스크롤 되었는지 비율이 있어야 한다.

    if(values.length === 3) {
      // start ~ end 사이에 애니메이션을 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      const parScrollRatio = (currentYOffset - partScrollStart) / partScrollHeight

      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = parScrollRatio * (values[1] - values[0]) + values[0];
      }else if (currentYOffset < partScrollStart) {
        rv = values[0];
      }else if( currentYOffset >= partScrollEnd) {
        rv = values[1];
      }
    }else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }


    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:

        // let sequence_1 = Math.round(calcValues(values.imageSequence, currentYOffset))
        // objs.context.drawImage(objs.videoImages[sequence_1], 0, 0)
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset)

        if(scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset)
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset)
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`
        }

        if(scrollRatio <= 0.42) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset)
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`
        }else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset)
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`
        }

        if(scrollRatio <= 0.62) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset)
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`
        }else {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset)
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`
        }

        if(scrollRatio <= 0.82) {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset)
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`
        }else {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset)
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`
        }


        // css setting
        break;
      case 2:

        // let sequence_2 = Math.round(calcValues(values.imageSequence, currentYOffset))
        // objs.context.drawImage(objs.videoImages[sequence_2], 0, 0);

        if(scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset)
        }else {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)
        }

        if(scrollRatio <= 0.32) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset)
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`
        }else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset)
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`
        }

        if(scrollRatio <= 0.62) {
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset)
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
          // objs.pinB.style.opacity = calcValues(values.pinB_opacity_in, currentYOffset)
        }else {
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset)
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
          // objs.pinB.style.opacity = calcValues(values.pinB_opacity_out, currentYOffset)
        }

        if(scrollRatio <= 0.93) {
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset)
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`
          // objs.pinC.style.opacity = calcValues(values.pinC_opacity_in, currentYOffset)
        }else {
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset)
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
          // objs.pinC.style.opacity = calcValues(values.pinC_opacity_out, currentYOffset)
        }


        // currentScene
        if(scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if(widthRatio <= heightRatio) {
            // canvas보다 브라우저가 홀쭉한 경우
            canvasScaleRatio = heightRatio
            // console.log("heightRatio")
          }else {
            canvasScaleRatio = widthRatio
            // console.log("widthRatio")
          }

          objs.canvas.style.transform = `scale(${canvasScaleRatio})`
          objs.context.drawImage(objs.images[0], 0, 0);
          objs.context.fillStyle = "#ffffff"

          // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          // window.innerWidth -> scroll 포함
          const recalculatedInnerWidth = document.body.offsetWidth/ canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
          const whiteRectWidth = recalculatedInnerWidth * 0.15;

          // coordinate 라로 생각하면 쉽다.
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // x, y, width, height
          // canvas는 정수로 그릴 때 성능이 조금 좋아진다.
          // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
          // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
          // console.log(calcValues(values.rect2X, currentYOffset))
          objs.context.fillRect(values.rect1X[1], 0, parseInt(whiteRectWidth), objs.canvas.height);
          objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);

        }
        break;
      case 3:
        // console.log('3 play')
        // 가로 세로 모두 꽉 차게 하기 위해서 셋팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if(widthRatio <= heightRatio) {
          // canvas보다 브라우저가 홀쭉한 경우
          canvasScaleRatio = heightRatio
          // console.log("heightRatio")
        }else {
          canvasScaleRatio = widthRatio
          // console.log("widthRatio")
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`
        objs.context.drawImage(objs.images[0], 0, 0);
        objs.context.fillStyle = "#ffffff"

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        // window.innerWidth -> scroll 포함
        const recalculatedInnerWidth = document.body.offsetWidth/ canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
        const whiteRectWidth = recalculatedInnerWidth * 0.15;

        // coordinate 라로 생각하면 쉽다.
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        //animation의 start와 end point
        // padding top이 상단에 닿다
        // 스크롤은 속도에 따라서 값이 변한다.
        if(!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top
          // css로 position 속성을 바꾸어 주면 된다.
          // 부모의 position이 중요하다. position relative는 자식의 위치 기준이 될 수 있다.

          // transform의 scale로 스케일을 변경하면 기본적인 지오메트리는 변경하지 않고, 눈에 보이는 모습만 바꾼다.
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight
          console.log(values.rect1X)
          values.rect1X[2].end = values.rectStartY / scrollHeight
          values.rect2X[2].end = values.rectStartY / scrollHeight
        }

        // x, y, width, height
        // canvas는 정수로 그릴 때 성능이 조금 좋아진다.
        // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        // console.log(calcValues(values.rect2X, currentYOffset))
        objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);

        if(scrollRatio < values.rect1X[2].end) {
          step = 1;
          objs.canvas.classList.remove("sticky")
        }else {
          step = 2

          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2
          objs.canvas.classList.add("sticky")
          objs.canvas.style.marginTop = `0`

          objs.canvas.style.top = `-${(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`
          // blendHeight [0, 0, { start: 0, end: 0}]
          // objs.context.drawImage(img, x, y, width, height)

          const blendHeight = calcValues(values.blendHeight, currentYOffset)

          objs.context.drawImage(objs.images[1],
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            );

            if(scrollRatio > values.blendHeight[2].end) {
              values.canvas_scale[0] = canvasScaleRatio;
              values.canvas_scale[1] = document.body.offsetWidth / (objs.canvas.width * 1.5)
              values.canvas_scale[2].start = values.blendHeight[2].end
              values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2

              objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`
            }

            if(scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
              console.log("스크롤 시작")
              objs.canvas.classList.remove("sticky")
              objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`

              values.canvasCaption_opacity[2].start = values.canvas_scale[2].end
              values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1
              values.canvasCaption_translateY[2].start = values.canvas_scale[2].end
              values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].start + 0.1

              objs.canvasCaption.style.opacity = `${calcValues(values.canvasCaption_opacity, currentYOffset)}`
              objs.canvasCaption.style.transform = `translate3d(0,${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`
            }
        }

        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for(let i = 0; i <  currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if(delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      if(currentScene === 0) return // 브라우저 바운스 효과 방어
      currentScene -= 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    // scroll의 오동작(-값)을 방어하기 위한 코드
    if(enterNewScene) {
      return
    }

    playAnimation();
  }

  yOffset = window.scrollY

  function loop() {
    // 속도를 감속시킬 때 사용한다.
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc

    if(!enterNewScene) {
      // scene이 바뀌는 순간에 발생할 수 있는 계산 오류를 예방
      if(currentScene === 0 || currentScene === 2){
        const currentYOffset = delayedYOffset - prevScrollHeight
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        let sequence_1 = Math.round(calcValues(values.imageSequence, currentYOffset))
        if(objs.videoImages[sequence_1]){
          objs.context.drawImage(objs.videoImages[sequence_1], 0, 0)
        }
      }
    }

    animationId = requestAnimationFrame(loop);

    if(Math.abs(window.scrollY - delayedYOffset) < 1) {
      cancelAnimationFrame(animationId)
      rafState = false
    }
  }

  window.addEventListener('load', () => {
    document.body.classList.remove("before-loading")
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    window.addEventListener('scroll', () => {
      yOffset = window.scrollY
      scrollLoop();
      checkMenu();

      if(!rafState) {
        animationId = requestAnimationFrame(loop);
        rafState = true
      }
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > 900) {
        setLayout();
        sceneInfo[3].values.rectStartY = 0
      }
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        setLayout()
      }, 500)
    });
    document.querySelector('.loading').addEventListener("transitionend", (event) => {
      document.body.removeChild(event.currentTarget)
    })
  })



  setCanvasImages()
})();
