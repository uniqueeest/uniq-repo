---
name: uniqueeest
description: 차분한 단일 컬럼 한국어 블로그(개발·AI·회고). 오프화이트 위 잉크, 올리브 액센트 하나, 헤어라인.
colors:
  bg: "#fafaf8"
  surface: "#f1f1ed"
  ink: "#18181b"
  muted: "#55555c"
  subtle: "#6b6b72"
  line: "#e4e3de"
  accent: "#3f6212"
  bg-dark: "#141413"
  surface-dark: "#1d1d1b"
  ink-dark: "#ecece8"
  muted-dark: "#b0b0aa"
  subtle-dark: "#8e8e89"
  line-dark: "#2b2b28"
  accent-dark: "#a3c26b"
typography:
  display:
    fontFamily: "Pretendard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Pretendard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Pretendard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Pretendard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Pretendard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  code:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "14px"
    lineHeight: 1.7
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "20px"
  lg: "40px"
  xl: "64px"
components:
  tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    typography: "{typography.label}"
  tag-hover:
    textColor: "{colors.ink}"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.ink}"
  code-block:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
    typography: "{typography.code}"
  theme-toggle:
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    size: "36px"
---

# Design System: uniqueeest

## Overview

**Creative North Star: "The Quiet Reading Room"**

카테고리 표준인 차분한 단일 컬럼 기술 블로그를 정공법으로 만든다. 따뜻한 오프화이트(다크는 #141413) 위에 잉크 텍스트, 회색 두 단계, 올리브 액센트 하나. 서체는 Pretendard 하나, 구분은 헤어라인, 그림자와 그라디언트는 없다. 읽기와 코드 블록이 가장 공들인 면이다.

거부한 것: 큰 히어로 이미지, 자기소개 블록, 카드 그리드. 홈은 큰 두 줄 문장과 한 문장 설명, 그 아래 헤어라인 글 리스트가 전부다.

**Key Characteristics:**
- 단일 컬럼, max-w-3xl 컨테이너(헤더·푸터·본문 같은 폭), 본문 728px
- 액센트는 링크, 현재 위치, 호버, 선택 영역, 강조 줄에만
- 라이트/다크는 CSS 변수 교체 (`.dark` 클래스, 시스템 설정 추종)
- 한국어 `word-break: keep-all`

## Colors

따뜻한 중성색 위에 올리브 하나.

### Primary
- **Moss Olive** (#3f6212 / 다크 #a3c26b): 본문 링크, 활성 내비 밑줄, 글 제목 호버, 포커스 링, 강조 줄 배경(12%), 선택 영역(22%).

### Neutral
- **Warm Paper** (#fafaf8 / #141413): 페이지 배경.
- **Sunk Paper** (#f1f1ed / #1d1d1b): 코드 블록, 인라인 코드, 토글 호버.
- **Ink** (#18181b / #ecece8): 제목과 본문.
- **Slate Muted** (#55555c / #b0b0aa): 설명, 비활성 내비, 태그, 인용.
- **Slate Subtle** (#6b6b72 / #8e8e89): 목차 라벨, 리스트 마커, 태그 호버 테두리.
- **Hairline** (#e4e3de / #2b2b28): 모든 구분선과 테두리.

### Named Rules
**The One Olive Rule.** 액센트는 올리브 하나뿐이며 상태와 링크를 표시할 때만 쓴다. 면을 채우는 장식으로 쓰지 않는다.

## Typography

**Font:** Pretendard Variable (로컬 woff2, ui-sans-serif 폴백). **Mono:** Geist Mono(next/font/google 자체 호스팅), 코드에만.

**Character:** 브런치처럼 글을 쓰는 공간. 단일 서체에 굵기는 500까지만 쓰고(워드마크만 700), 크기와 여백으로 위계를 만든다.

### Hierarchy
- **Display** (500, -0.015em): 홈 첫 문장 1.6rem / sm 1.9rem, 글 제목 1.85rem / sm 2.25rem, 페이지 제목 1.875rem / sm 2.25rem.
- **Headline** (500, 1.55rem, 1.375): 본문 h2. 위 5rem, 아래 1.25rem.
- **Title** (500, 1.125~1.2rem): 글 리스트 제목 18px, 본문 h3.
- **Body** (400, 17px, 1.95, +0.005em): 글 본문과 About. 리스트 설명은 15px muted.
- **Label** (400, 13~14px, subtle): "최근 글"·"관련 글" 같은 섹션 라벨, 날짜, #태그, 목차, "*by* uniqueeest" 메타.

### Named Rules
**The Light-Hand Rule.** 제목도 굵게 외치지 않는다. 섹션 라벨은 작은 subtle 텍스트로 충분하다.
**No Reading Time.** 읽는 시간·분량 같은 수치는 보여주지 않는다. 메타는 작가와 날짜뿐.
**Quiet Break.** 본문 hr은 가운데 48px 짧은 선.

## Layout

단일 컬럼. 컨테이너 `max-w-3xl` + 좌우 20px, 가운데 정렬. 헤더 64px sticky(반투명 + blur). 글 상세는 본문을 가운데 두고 xl에서 오른쪽 여백에 224px sticky 목차를 띄움, 좁은 화면은 본문 위 접이식 목차. 코드 블록은 모바일에서 -mx-5로 화면 끝까지. 리듬은 본문 요소 간 1.25em, h2 위 4rem, 리스트 항목 간격 2.25rem, 푸터 위 6rem.

## Elevation & Depth

플랫. 그림자 없음. 깊이는 Sunk Paper 톤과 헤어라인으로만 표현한다. 예외로 헤더에 backdrop-blur가 있다.

## Shapes

각진 편. 코드 블록 8px(모바일은 직각), 이미지 6px, 인라인 코드 4px, 토글은 원형. 테두리는 1px Hairline.

## Components

### Tag
`#태그` 텍스트 링크, subtle 13px, 테두리 없음. 호버 시 ink.

### Navigation
글 / 소개 + 테마 토글 (태그는 글의 #태그 링크로만 진입). 14px muted, 활성은 ink + 하단 2px 올리브 막대, `aria-current="page"`. 워드마크는 15px 700.

### Post List Item
구분선 없는 행. sm 이상에서 왼쪽 6.5rem 날짜 열 + 오른쪽 제목(17px 700) / 설명 muted 15px / #태그. 모바일은 날짜가 위로. 제목 호버 시 올리브.

### Code Block
Sunk Paper 배경, mono 14px/1.7, 줄 단위 px-5, 강조 줄은 올리브 12%, 파일명 캡션은 하단 헤어라인.

### Theme Toggle
36px 원형 아이콘 버튼, 라이트는 달, 다크는 해(인라인 SVG, 1.75 선).

## Do's and Don'ts

### Do:
- **Do** 모든 색은 CSS 변수(`bg-bg`, `text-muted` 등)로 쓴다.
- **Do** 구분은 1px Hairline으로 한다.
- **Do** 새 글 요소는 `.prose` 규칙 안에서 스타일한다.
- **Do** 숫자 날짜는 tabular-nums.

### Don't:
- **Don't** 카드 그리드, 큰 히어로, 자기소개 블록을 넣지 않는다.
- **Don't** 그림자와 그라디언트를 쓰지 않는다.
- **Don't** 올리브 외 두 번째 액센트를 추가하지 않는다.
- **Don't** 옛 녹색 토큰이나 tailwind.config 기반 테마로 돌아가지 않는다.

<!-- Reference: milooy.github.io 수준의 조용한 목록을 지향(2026-11-17). -->
