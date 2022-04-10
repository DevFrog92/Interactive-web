
// 전역 변수의 사용을 피하기 위해서 즉시 실행 함수를 사용한다.

(() => {
  let YOffset = 0; // window.scrollY 대시 사용할 변수
  let prevScrollHeight = 0; // 현재 위치한 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 합
  let currentScene = 0; // 현재 활성화된 scene(scroll-section)

  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, // 여러가지 기기로 접속할 수 있기 때문에, 창 사이즈에 대해서 동적으로 값을 생성할 수 있다.
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d")
      },
      values: {
        messageA_opacity: [0, 1]
      }
    },
    {
      //1
      type: 'normal',
      heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, // 여러가지 기기로 접속할 수 있기 때문에, 창 사이즈에 대해서 동적으로 값을 생성할 수 있다.
      objs: {
        container: document.querySelector("#scroll-section-1")
      }
    },
    {
      //2
      type: 'sticky',
      heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, // 여러가지 기기로 접속할 수 있기 때문에, 창 사이즈에 대해서 동적으로 값을 생성할 수 있다.
      objs: {
        container: document.querySelector("#scroll-section-2")
      }
    },
    {
      //3
      type: 'sticky',
      heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, // 여러가지 기기로 접속할 수 있기 때문에, 창 사이즈에 대해서 동적으로 값을 생성할 수 있다.
      objs: {
        container: document.querySelector("#scroll-section-3")
      }
    }
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이를 셋팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
    }

    // 사용자가 새로고침 하거나 첫 로드시에 scene의 위치를 판별한다.
    YOffset = window.scrollY
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight
      if (totalScrollHeight >=YOffset) {
        currentScene = i;
        break
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    // currentYOffset 현재 scene에서 얼마나 scroll 되었는지

  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = YOffset - prevScrollHeight

    switch (currentScene) {
      case 0:
        let messageA_opacity_0 = values.messageA_opacity[0];
        let messageA_opacity_1 = values.messageA_opacity[1];
        calcValues(values.messageA_opacity, currentYOffset);
        break
      case 1:
        break
      case 2:
        break
      case 3:
        break
    }
  }

  // 현재 스크롤이 어떠한 색션에 걸쳐있는지 계산
  function scrollLoop() {
    // 현재 사용자의 스크롤이 어떤 scene에 위차하는지에 대한 정보를 수집
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (YOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (YOffset < prevScrollHeight) {
      // 방어 코드 -> 바운스 효과로 인해서 스크롤이 -가 되는 이유 때문에
      if (currentScene == 0) {
        return
      }

      currentScene -= 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    playAnimation();
  }

  window.addEventListener('scroll', () => {
    YOffset = window.scrollY;
    scrollLoop();
  });

  // DOM 구조만 로드가 되면 동작한다.
  // window.addEventListener('DOMcontentLoaded', setLayout)

  // resource까지 로드 되어야 동작한다.
  window.addEventListener('load', setLayout)
  window.addEventListener('resize', setLayout);
})();