// 즉시 실행함수 선언
// 전역 변수 사용을 피하기 위해서 사용

(() => {

  let yOffset = 0; // window.scrollY 대신 사용할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true

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
        canvas_opacity_in: [0, 1, { start: 0.9, end: 1}],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1}],
        messageA_opacity_in: [0, 1, {start: 0.15, end: 0.2}],
        messageB_opacity_in: [0, 1, {start: 0.55, end: 0.6}],
        messageC_opacity_in: [0, 1, {start: 0.72, end: 0.77}],
        messageA_translateY_in: [20, 0, {start: 0.15, end: 0.2}],
        messageB_translateY_in: [30, 0, {start: 0.55, end: 0.6}],
        messageC_translateY_in: [30, 0, {start: 0.72, end: 0.77}],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35}],
        messageB_opacity_out: [1, 0, { start: 0.63, end: 0.68}],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9}],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35}],
        messageB_translateY_out: [0, -20, { start: 0.63, end: 0.68}],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9}],
        pinB_scaleY: [0.5, 1, { start: 0.55, end: 0.6}],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77}],
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
        canvasCaption: document.querySelector('.canvas-caption')
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
  }

  setCanvasImages()

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

        let sequence_1 = Math.round(calcValues(values.imageSequence, currentYOffset))
        objs.context.drawImage(objs.videoImages[sequence_1], 0, 0);
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

      let sequence_2 = Math.round(calcValues(values.imageSequence, currentYOffset))
      objs.context.drawImage(objs.videoImages[sequence_2], 0, 0);

      if(scrollRatio <= 0.25) {
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

      if(scrollRatio <= 0.83) {
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

        // console.log('2 play')
        break;
      case 3:
        // console.log('3 play')
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for(let i = 0; i <  currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if(yOffset < prevScrollHeight) {
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

  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  })
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.scrollY
    scrollLoop();
  });
})();
