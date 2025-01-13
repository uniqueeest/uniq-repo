---
title: 'use-funnel 구현과 안드로이드 웹뷰 History 이슈 해결하기'
description: '@toss/use-funnel을 참고한 Funnel 구현과 안드로이드 물리 버튼 대응'
date: '2024-12-21T00:00:00Z'
---

최근 토스의 [use-funnel](https://use-funnel.slash.page/ko)을 참고하여 단계별 화면 전환 기능을 구현하던 중, 안드로이드 웹뷰 환경에서 흥미로운 이슈를 만났다. 이 글에서는 기존 구현 방식의 한계와 이를 개선한 과정을 공유하고자 한다.

## 초기 구현: State 기반 Funnel 관리

처음에는 React의 state만을 사용하여 funnel을 관리했다. 각 단계(step)를 state로 관리하고, 이동할 때마다 history 배열에 쌓는 방식이었다.

```tsx
const stepsRef = useRef(steps);
const [state, setState] = useState<FunnelState<T>>({
  currentStep: steps[0],
  history: [{ step: steps[0], index: 0 }],
  currentIndex: 0,
});

const internalStateRef = useRef(state);
internalStateRef.current = state;
```

이 방식은 일반적인 웹 환경이나 iOS 웹뷰에서는 잘 동작했다. 하지만 치명적인 문제가 있었다.

## 문제 상황: 안드로이드 물리 버튼

안드로이드 테스트 중 물리적인 뒤로가기 버튼을 눌렀을 때, 예상과 다르게 동작하는 현상이 발견됐다.

**기대한 동작**:

- Funnel의 이전 단계로 이동

**실제 동작**:

- 브라우저의 이전 history로 이동

이는 안드로이드의 물리적 뒤로가기 버튼(Hardware Backbutton)이 브라우저의 history stack을 직접 조작하는 반면, 구현한 funnel은 state로만 관리되고 있었기 때문이다.

## 해결책: URL Query String 활용

토스의 use-funnel처럼 query string에 현재 단계를 저장하는 방식으로 전환했다. 이렇게 하면 브라우저의 history stack과 funnel의 상태가 동기화된다.

### 1. URL에서 현재 단계 읽기

```tsx
const getCurrentStepFromURL = useCallback(() => {
  const stepFromURL = searchParams.get(funnelId);
  return stepFromURL && steps.includes(stepFromURL as T)
    ? (stepFromURL as T)
    : steps[0];
}, [searchParams, funnelId, steps]);

const [state, setState] = useState<FunnelState<T>>(() => {
  const initialStep = getCurrentStepFromURL();
  return {
    currentStep: initialStep,
    history: [{ step: initialStep, index: 0 }],
    currentIndex: 0,
  };
});
```

### 2. 단계 이동 시 URL 업데이트

```tsx
const setStep = useCallback(
  (step: T) => {
    if (!stepsRef.current.includes(step)) return;

    // URL 변경 플래그 설정
    isNavigatingRef.current = true;

    // query string 업데이트
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(funnelId, step);
    router.push(`${defaultPrefix}?${newSearchParams.toString()}`);

    // state 업데이트
    setState((prev) => ({
      currentStep: step,
      history: [...prev.history, { step, index: prev.history.length }],
      currentIndex: prev.currentIndex + 1,
    }));
  },
  [router, searchParams, funnelId, defaultPrefix],
);
```

### 3. URL 변경 감지와 상태 동기화

```tsx
useEffect(() => {
  // programmatic navigation은 무시
  if (isNavigatingRef.current) {
    isNavigatingRef.current = false;
    return;
  }

  // URL 변경 시 state 업데이트
  const stepFromURL = getCurrentStepFromURL();
  if (stepFromURL !== state.currentStep) {
    setState((prev) => ({
      currentStep: stepFromURL,
      history: [
        ...prev.history,
        { step: stepFromURL, index: prev.history.length },
      ],
      currentIndex: prev.currentIndex + 1,
    }));
  }
}, [searchParams, getCurrentStepFromURL, state.currentStep]);
```

## 개선된 구현의 장점

1. **플랫폼 일관성**: iOS, 안드로이드 모두에서 동일하게 동작한다.
2. **브라우저 통합**: 브라우저의 history 기능과 완벽하게 통합된다.
3. **URL 공유**: 현재 단계가 URL에 포함되어 있어 공유가 가능하다.
4. **상태 지속성**: 페이지 새로고침 시에도 현재 단계가 유지된다.

## 구현 시 주의사항

1. **단계 유효성 검증**: URL을 통해 직접 접근할 수 있으므로, 각 단계의 유효성을 반드시 검증해야 한다.
2. **이동 플래그 관리**: `isNavigatingRef`를 통해 프로그래밍적 이동과 브라우저 네비게이션을 구분해야 한다.
3. **Query String 충돌**: 다른 용도로 사용 중인 query parameter와 충돌하지 않도록 주의한다.

## 결론

해당 이슈는 모두 toss의 use-funnel에서는 이슈 없이 동작하는 부분이다. 하지만 app router와 완벽한 호환을 이루지 않고 있어서, 직접 구현을 해봤다. 웹뷰 환경에서는 url이 직접적으로 노출되지 않기 때문에 해당 방식대로 url을 활용하는 것이 퍼널을 구현하는데 있어서 더 안정적인 방법이라 생각한다.
