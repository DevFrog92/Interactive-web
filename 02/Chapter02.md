# HTML
> HTML - Hypertext Markup Language <br>
> 웹 문서 콘텐트 구조를 만드는 기본 언어

HTML은 웹의 기본, 골격, 마크업 언어일 뿐 아니라, 애플리케이션을 구성하는 다양한 스펙들이 존재한다.

<br>

## HTML Version

[HTML Living Standard](https://html.spec.whatwg.org)이 현재 최신 버전

## HTML
`lang` 을 `ko`로 설정하면 스크린리더에서 웹 페이지를 해석할때 한글로 표현해주기 때문에 설정하는 것이 중요하다.

### `<head>`

문서의 메타데이터 및 `SEO`에 관여하는 설정을 작성하는 영역이다.

### `<body>`

실제 콘텐츠가 표시되는 영역이다.


## HTML Tag
## 글, 텍스트, 링크
### 제목(heading) - h1 ~ h6
숫자가 작을 수록 큰 제목을 나타낸다.
h1는 검색에 아주 중요한 영향이다.
제목의 레벨에 따라 내용의 그룹을 결정한다.

### 문장과 문단(paragraph) - P

### 목록 - ul,ol,dl
ul - unordered list
ol - ordered list
dl - 제목과 설명의 쌍으로 이루어진 형태의 목록
```html
  <dl>
    <dt>제목</dt>
    <dd>설명</dd>
  </dl>
```

### 인용 - blockquote, q
q는 텍스트 중간에 사용한다.
### 줄바꾼 - br, wbr
`wbr` 은 줄바꿈 위치를 명시해 해준다.
### 링크 - a
hash link
history api
### 강조 - Strong,em
Strong은 의미가 있는 강조에 적용한다.
### 출처 - cite
### span
div의 인라인 버전이다.
특별한 의미 없이 디자인이나 값 지정 등의 목적으로 텍스트를 감싸는 용도이다.

## 외부에서 불러오는 콘텐츠
### 이미지 - img
`alt`: 대체 텍스트 이미지
`srcset`: 기기의 픽셀 집적도에 따라서 렌더링할 이미지를 지정할 수 있다.


### figure
콘텐츠와 관련된 이미지, 비디오, 오디오 등을 감싸는 용도의 태그
본문과 관련된 콘텐츠이다.

### picture
img 대신 사용할 수 있는 태그. 내부의 이미지들을 순서대로 하나씩 로드를 시도, 브라우저에서 읽는게 가능한 포맷을 만나면 그 이미지를 표시하고 아래 파일들은 무시한다.
```HTML
<picture>
  <source src="./images/pizza.jpg">
  <source src="./images/pizza.svg">
  <img src="./images/pizza.png">
</picture>
```

### video
브라우저 정책상 단독 autoplay를 사용할 수 없다. muted가 필요.
muted와 같은 속성이름은 속성값과 같기 때문에 값을 생략할 수 있다.

```HTML
<video>
  <source src="./images/pizza.mp4">
  <source src="./images/pizza.mov">
</video>
```

### audio

### table
caption은 table의 제목과 같다.
속성 `colspan`은 열을 합칠 수 있고, `rowspan`은 행을 합칠 수 있다.

### form
