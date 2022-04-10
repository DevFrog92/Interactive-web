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
        container: document.querySelector('#scroll-section-0')
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

  }

  function scrollLoop() {
    prevScrollHeight = 0;

    for(let i = 0; i <  currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene += 1;
    }

    if(yOffset < prevScrollHeight) {
      if(currentScene === 0) return // 브라우저 바운스 효과 방어

      currentScene -= 1;
    }

    console.log(currentScene)
  }


  window.addEventListener("resize", setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.scrollY
    scrollLoop();
  });

  setLayout();
})();
