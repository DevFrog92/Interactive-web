// 즉시 실행함수 선언
// 전역 변수 사용을 피하기 위해서 사용

(() => {

  let yOffset = 0; // window.scrollY 대신 사용할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      scrollHeight: 0, // 사용자가 어떠한 디바이스로 열지 모르겠읜, 스크린 높이의 배수로 해주기 위함
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1]
      }
    },
    {
      // 1
      type: "normal",
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // 2
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  function setLayout() {

    //각 스크롤 섹션의 높이를 셋팅

    for(let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
  }

  function calcValues(values, currentYOffset) {
    // 각 섹션마다 얼마나 스크롤이 되었는지가 중요하다
    let rv;
    // 현재 스크롤 섹션에서 스크롤된 비율 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight
    // 얼만큼 스크롤 되었는지 비율이 있어야 한다.
    rv = scrollRatio * (values[1] - values[0]) + values[0]

    return rv;

  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;


    switch (currentScene) {
      case 0:

        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset)
        objs.messageA.style.opacity = messageA_opacity_in
        // css setting
        break;

      case 1:
        // console.log('1 play')
        break;
      case 2:
        // console.log('2 play')
        break;
      case 3:
        // console.log('3 play')
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;

    for(let i = 0; i <  currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if(yOffset < prevScrollHeight) {
      if(currentScene === 0) return // 브라우저 바운스 효과 방어

      currentScene -= 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    playAnimation();
  }

  yOffset = window.scrollY

  window.addEventListener("load", () => {
    setLayout()
  })
  window.addEventListener("resize", setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.scrollY
    scrollLoop();
  });
})();