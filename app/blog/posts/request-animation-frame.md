---
title: '당신이 setTimeout 대신 requestAnimiationFrame을 써야 되는 이유'
description: '브라우저의 렌더링 성능을 최적화하는 requestAnimationFrame'
date: '2025-04-10T00:00:00Z'
tag: ['frontend', 'javascript']
---

scheduling call을 위한 대표적인 API를 꼽자면 `setTimeout`, `setInterval`, 그리고 `requestAnimationFrame`을 꼽을 수 있다. 그러나 우리는 `setTimeout`, `setInterval`과 비교했을 때 `requestAnimationFrame`은 자주 사용하지 않는다. 이 API가 앞서 두 개의 API보다 범용성이 적어서일까? 아니면 앞서 두 개의 API가 더 친숙해서일까?

겪었던 이슈에 대해 설명하며, 애니메이션과 관련된 부분에서 유용하게 사용할 수 있는 `requestAnimationFrame`을 소개해보려고 한다.

## 이슈

query parameter로 focus를 하고 싶은 상품을 입력하면, 해당 상품의 위치에 focus가 되게 하도록 구현을 하는 태스크를 받았다.

```tsx
useEffect(() => {
  window.scrollTo({
    behavior: 'smooth',
    top: window.scrollY + ref.current.getBoundingClientRect().top,
  });
}, []);
```

처음에는 간단하게 effect를 통해 focus와 id가 같은 컴포넌트의 `ref` 위치를 잡아 해당 위치로 스크롤 되게 구현을 했다. 이 방법은 일반적으로는 문제가 없었으나, 반응형으로 컴포넌트의 높이가 달라질 때 문제가 발생했다.

### why?

이 부분은 브라우저의 렌더링 단계를 이해하고 있다면 알 수 있는 부분인데, 간단하게 브라우저 렌더링 과정을 설명하자면

> DOM 생성 > CSSOM 생성 > Layout > Paint > Composite

단계를 거친다. useEffect는 DOM이 생성된 직후에 실행되지만, 브라우저가 완전한 레이아웃 계산을 끝내기 전일 수 있다. 특히 반응형 레이아웃에서는 이미지 로딩, 미디어 쿼리 적용 등으로 인해 실제 요소의 최종 위치가 결정되지 않은 상태일 수 있다.

반응형에 따라 요소의 높이나 위치가 변경되는 것은 레이아웃(또는 reflow) 과정에 해당한다. 화면 크기나 방향이 바뀌면 브라우저는 요소들의 크기와 위치를 다시 계산하는 reflow를 수행한다. 이 과정이 완료되기 전에 위치를 측정하면 정확한 값을 얻을 수 없다.

## setTimeout을 사용한 해결 시도

이 문제를 해결하기 위해 처음에는 setTimeout을 사용하는 방법을 생각했다.

```tsx
useEffect(() => {
  setTimeout(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: window.scrollY + ref.current.getBoundingClientRect().top,
    });
  }, 100); // 약간의 지연 추가
}, []);
```

이 방법은 브라우저에게 레이아웃 계산을 위한 시간을 주기 위해 약간의 지연을 추가하는 것이다. 하지만 이 접근법에는 몇 가지 문제점이 있다:

- 임의의 지연 시간: 100ms가 충분할까? 모든 디바이스와 네트워크 환경에서 이 시간이 적절할까? 너무 짧으면 여전히 레이아웃 계산이 완료되지 않을 수 있고, 너무 길면 사용자 경험이 저하된다.
- 성능 문제: setTimeout은 브라우저의 렌더링 사이클과 동기화되지 않는다. 타이머는 렌더링 사이클과 무관하게 실행되므로, 브라우저가 바쁜 상태일 때 추가적인 부담을 줄 수 있다.
- 불필요한 reflow: 렌더링 사이클 중간에 DOM을 조작하면 추가적인 리플로우가 발생할 수 있다.

## requestAnimationFrame의 등장

이러한 문제를 해결하기 위해 `requestAnimationFrame`을 사용하게 되었다.

```tsx
useEffect(() => {
  // 다음 화면 렌더링 직전에 실행
  requestAnimationFrame(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: window.scrollY + ref.current.getBoundingClientRect().top,
    });
  });
}, []);
```

`requestAnimationFrame`은 다음 화면 렌더링 직전에 지정한 콜백 함수를 실행한다. 이는 브라우저의 렌더링 사이클과 완벽하게 동기화되어 있어 몇 가지 중요한 이점을 제공한다:

- 브라우저 렌더링 사이클과 동기화: 브라우저가 다음 프레임을 그리기 직전에 실행되므로, 레이아웃 계산이 완료된 상태에서 정확한 위치 값을 얻을 수 있다.
- 성능 최적화: 브라우저는 백그라운드 탭이나 화면 밖의 iframe에서는 애니메이션을 일시 중지하여 불필요한 작업을 줄인다.
- 배터리 효율성: 화면 주사율(보통 60fps)에 맞추어 실행되므로, 불필요한 연산을 줄이고 배터리 사용량을 최적화한다.
- 더 부드러운 애니메이션: 브라우저의 렌더링 타이밍과 정확히 일치하므로 애니메이션이 더 부드럽게 보인다.

## 결론

`setTimeout`은 자바스크립트에서 비동기 작업을 처리하는 데 유용한 도구이지만, 시각적 업데이트나 애니메이션 관련 작업에는 `requestAnimationFrame`이 더 적합하다. 특히

- 애니메이션을 구현할 때
- DOM 측정 및 조작이 필요할 때
- 스크롤 이벤트나 리사이즈 이벤트를 처리할 때
- 시각적 변화를 적용할 때

이러한 상황에서는 `setTimeout` 대신 `requestAnimationFrame`을 사용하여 브라우저의 렌더링 사이클과 조화롭게 작동하는 코드를 작성하자. 그러면 더 부드럽고, 성능이 좋으며, 배터리 효율적인 웹 애플리케이션을 만들 수 있다.
