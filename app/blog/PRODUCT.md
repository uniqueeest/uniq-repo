# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

동료 프론트엔드 개발자. 대부분 검색(구글)으로 특정 문제(CORS preflight, 안드로이드 웹뷰 history, TanStack Query 구독 등)를 풀다가 글 하나로 들어온다. 데스크톱에서 코드 블록을 읽고 따라 하는 시간이 길고, 마음에 들면 다른 글을 더 둘러본다. 개발 밖 주제(AI, 일하는 방식, 회고)를 읽으러 오는 개발자·IT 직군도 독자다.

## Product Purpose

uniqueeest.com은 프론트엔드 엔지니어 최윤재의 블로그. 개발에 국한하지 않고 AI, 일하는 방식, 회고 등 다양한 주제를 다룬다(2026-11-17 결정). 실무에서 부딪힌 문제를 푼 기록도 그중 하나. 성공은 검색으로 들어온 개발자가 글을 끝까지 읽고, 다른 글을 하나 더 읽고, 구독(RSS)하는 것.

## Positioning

브런치 같은 개인 글쓰기 공간(2026-11-17 결정). 이력서 역할은 가장 후순위라 경력 나열은 하지 않는다.

실무에서 직접 겪은 이슈(웹뷰, 마이그레이션, 업로드 제한 등)를 출발점으로, 라이브러리 내부 동작까지 파고드는 글. 개념 정리 블로그가 아니라 "겪고 → 가설 → 시도 → 해결" 흐름의 기록. 기술 외 글도 직접 겪은 일에서 출발한다.

## Operating Context

- 한국어 글. 코드 블록(tsx/ts/js)이 많고 긴 글은 400줄 이상.
- 글은 레포 안 `content/posts/*.md(x)`로 직접 작성, git push로 배포.
- 레퍼런스 사이트 구조: evan-moon.github.io (홈의 소개 + 인기/최근 글, 글 목록, 태그, 목차, 관련 글, 확장된 About, RSS).

## Capabilities and Constraints

- Next.js(App Router) + velite 정적 생성, pnpm/turbo 모노레포 안의 `app/blog`.
- 기능: 글 목록, 글 상세, 태그, About, sitemap/robots, GA, Google Search Console.
- 추가 예정: 태그별 모아보기, 글 목차, 관련 글, RSS 피드, 확장된 About.
- 미정: 경력·프로젝트·발표 상세 내용(About), 영어 버전, 댓글.

## Brand Commitments

- 이름 `uniqueeest` 유지. 로고·파비콘·OG 이미지는 교체 대상.
- 필자 표기: 최윤재 / Yoonjae Choi, Front-end Engineer.
- 소개 문장: "프로덕트의 방향성을 함께 고민하고 비즈니스 가치 창출에 기여하는 개발자를 지향합니다."
- 말투: 글 본문은 평서체("~했다"), 담백하고 과장 없음.

## Evidence on Hand

- 글 9편 (`content/posts/`): 기술 7, 회고 2 (2024–2025).
- 연락처: GitHub(uniqueeest), LinkedIn.
- 없음: 조회수 데이터(인기 글 순위 근거 없음), 경력 상세, 추천사. 만들어 넣지 않는다.

## Product Principles

1. 읽기가 먼저다. 본문 가독성과 코드 블록이 사이트에서 가장 공들인 부분이어야 한다.
2. 들어온 글에서 다음 글로 이어지게 한다(태그, 관련 글).
3. 쓰기 쉬워야 한다. 새 글은 md/mdx 파일 하나로 끝난다.
4. 있는 사실만 보여준다. 숫자·경력·평판을 지어내지 않는다.

## Accessibility & Inclusion

다크 모드 사용자 다수(개발자). 시스템 설정을 따른다. 코드 블록 대비는 양쪽 테마에서 WCAG AA.
