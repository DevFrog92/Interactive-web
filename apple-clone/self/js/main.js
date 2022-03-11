
// 전역 변수의 사용을 피하기 위해서 즉시 실행 함수를 사용한다.

(() => {
  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, // 여러가지 기기로 접속할 수 있기 때문에, 창 사이즈에 대해서 동적으로 값을 생성할 수 있다.
      objs: {
        container: document.querySelector("#scroll-section-0")
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
  }

  window.addEventListener('resize', setLayout);

  setLayout()
})();