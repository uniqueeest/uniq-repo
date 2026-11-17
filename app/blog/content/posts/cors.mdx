---
title: 'CORS, 숨겨진 preflight 확인하기'
description: 'origin header는 사라지지 않는다.'
date: '2025-08-01T00:00:00Z'
tag: ['frontend', 'network', 'CORS']
id: 'cors'
---

최근 프론트엔드 개발 중 CORS(Cross-Origin Resource Sharing) 오류를 마주쳤다. API 요청이 실패하고 `Access-Control-Allow-Origin` 관련 오류가 떴었고, 그 문제를 해결했던 과정을 공유하려 한다.

## CORS 에러와 Origin 헤더 누락 가설

API 요청이 실패하고 브라우저 콘솔에 CORS 관련 오류가 떴다. 평소 같으면 서버 설정을 의심했겠지만, 이번엔 특이한 점을 발견했다. 바로 Chrome 개발자 도구의 Network 탭에서 일부 요청의 헤더에 **Origin**이 보이지 않았다는 것이다.

최근 프로젝트를 Next.js로 마이그레이션하면서 API 요청에 공통으로 커스텀 헤더를 추가하는 작업을 진행했었다. 그래서 이 과정에서 Origin 헤더가 누락되어 서버가 CORS 요청으로 제대로 인식하지 못해 생긴 문제라고 생각했다.

프로젝트에서는 axios를 커스터마이징 한 함수를 사용했는데, 여기서 `fetch` adapter를 쓰고 있는 것을 확인했다. `fetch`는 브라우저 API이기 때문에 헤더 처리가 axios의 기본값인 `XHR`과 다를 수 있으니 이 부분을 처음에는 문제라고 생각했다.

### 시도한 방법

1. axios adapter를 `['fetch']`에서 `['xhr']`로 변경
2. `axios.request`로 구현된 로직을 `axios.create()`로 변환 시도 (다른 로직들과 강결합되어 있어서 중간에 되돌림)

하지만 예상과 다르게 adapter를 xhr로 바꿔도 문제는 해결되지 않았다.

## 두 번째 가설 Preflight Request 실패 (OPTIONS 403)

Network 탭에서 All 필터로 모든 요청을 자세히 봤더니, 진짜 원인을 찾을 수 있었다. 실제 GET 요청이 보내지기 전에 OPTIONS 메서드를 쓰는 Preflight 요청이 자동으로 발생하고 있었는데, 이 Preflight 요청이 403 Forbidden 응답을 받고 있었던 것이다.

Preflight 요청은 다음 조건 중 하나라도 만족하면 브라우저가 자동으로 보낸다.

- Content-Type이 application/json이 아닌 경우
- Authorization이나 커스텀 헤더가 포함된 경우

이번 요청은 GET 메서드였지만 커스텀 헤더를 포함하고 있었기 때문에 Preflight 요청이 발생한 거였다.

문제는 백엔드 서버가 이 OPTIONS 메서드 요청을 허용하지 않거나, 인증 절차 없이 접근하는 걸 막고 있었던 것이다. 브라우저는 Preflight 요청이 실패하면 보안상의 이유로 본 요청 자체를 보내지 않고 CORS 오류를 띄워버린다.

결국 진짜 원인은 Preflight 요청이 서버에서 403 에러를 반환하며 실패했기 때문이다. Chrome 개발자 도구에서 Origin 헤더가 안 보였던 건 그냥 UI 문제였고, 다른 브라우저(Safari)에서 확인했을 때 origin 헤더가 정상적으로 보내지는 것이 확인되었다.

## 회고

CORS는 자주 마주치는 기초적인 이슈지만, 그만큼 익숙하다는 이유로 디테일을 놓치기 쉽다. 나 역시 처음엔 단순히 백엔드 문제라고 넘기려 했지만, 깊이 파고들면서 비로소 정확한 원인을 찾을 수 있었다.

문제를 '내 영역 밖'이라고 단정 짓기보다, 함께 원인을 추적하고 해결해 나가는 과정이 진정한 협업이지 않을까.
