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

### 인용 - blockquote
### 줄바꾼 - br, wbr
`wbr` 은 줄바꿈 위치를 명시해 해준다.
### 링크 - a
hash link