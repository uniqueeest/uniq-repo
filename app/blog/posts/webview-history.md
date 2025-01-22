---
title: '안드로이드 웹뷰에서 Next.js Router History 이슈 해결하기'
description: '안드로이드 webview에서의 history stack'
date: '2024-12-10T00:00:00Z'
tag: ['frontend', 'nextjs']
---

React Native와 Next.js로 하이브리드 웹앱을 개발하던 중 안드로이드 웹뷰에서 이슈를 만났다.

Next.js의 `router.push()` 실행 시 history가 제대로 쌓이지 않아 `router.back()`이 작동하지 않는 문제였다.

이 글에서는 문제를 해결하기 위해 시도했던 여러 방법들과 최종 해결책을 공유하고자 한다.

## 문제 상황

일반적인 웹 환경에서는 Next.js router를 통한 페이지 이동이 정상적으로 동작한다. 하지만 안드로이드 웹뷰 환경에서는 뒤로 가기가 전혀 동작하지 않았다.

```tsx
// A 페이지
<Button onClick={() => router.push('/page-b')}>B로 이동</Button>

// B 페이지
<Button onClick={() => router.back()}>뒤로 가기</Button> // 동작하지 않음
```

## 1: 웹뷰 스택 방식

처음에는 postMessage를 통해 웹뷰 스택을 직접 관리하는 방식을 시도했다. 안드로이드 환경일 때 router 함수를 확장하여 네이티브와 통신하는 방식이었다.

```ts
const useCustomRouter = () => {
  const router = useRouter();
  const isAndroid = navigator.userAgent.includes('wv');

  const push = useCallback(
    (url: string) => {
      if (isAndroid) {
        ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'ROUTER_EVENT',
            path: url,
          }),
        );
      } else {
        router.push(url);
      }
    },
    [router],
  );

  const back = useCallback(() => {
    if (isAndroid) {
      ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ROUTER_BACK',
        }),
      );
    } else {
      router.back();
    }
  }, [router]);

  return { push, back };
};
```

하지만 이 방식에는 두 가지 심각한 문제가 있었다.

1. `history.go(-2)`와 같은 history API의 고급 기능을 사용할 수 없다.
2. tanstack-query로 캐싱해둔 데이터를 재사용하지 못하고 매번 새로운 요청을 해야 했다.

## 2: WebView goBack 메서드

WebView 컴포넌트의 내장 `goBack` 메서드를 활용해보았다.

```tsx
const webViewRef = useRef < WebView > null;

const goBack = useCallback(() => {
  webViewRef.current?.goBack();
}, []);

return (
  <WebView
    ref={webViewRef}
    // ... 기타 props
  />
);
```

이 방식도 한계가 있었다. `goBack()`은 웹뷰의 자체 history 스택을 사용하기 때문에 Next.js의 `window.history`와 동기화되지 않았다.

## 3: localStorage 기반 History 관리

마지막으로 찾은 해결책은 localStorage를 활용해 직접 history 스택을 관리하는 방식이다. 이 방법은 다음과 같은 장점이 있다.

1. history 스택을 완벽하게 제어할 수 있다.
2. Next.js의 라우팅 기능을 그대로 활용할 수 있다.
3. tanstack-query 등의 클라이언트 상태 관리 도구들과 호환된다.
4. 플랫폼별 분기 처리가 깔끔하다.

```tsx
// history 타입 정의
interface HistoryEntry {
  path: string;
  timestamp: number;
}

const addToHistory = useCallback(
  (path: string) => {
    const history = getHistory();
    const newEntry: HistoryEntry = {
      path,
      timestamp: Date.now(),
    };

    history.push(newEntry);
    saveHistory(history);
  },
  [getHistory, saveHistory],
);

const removeLastHistory = useCallback(() => {
  const history = getHistory();
  if (history.length > 0) {
    history.pop();
    saveHistory(history);
    return history[history.length - 1]?.path;
  }
  return null;
}, [getHistory, saveHistory]);

const push = useCallback(
  (url: string) => {
    if (isAndroidWebView) {
      addToHistory(url);
    }
    router.push(url);
  },
  [isAndroidWebView, router, addToHistory],
);

const back = useCallback(() => {
  if (isAndroidWebView) {
    const previousPath = removeLastHistory();
    if (previousPath) {
      router.push(previousPath);
    } else {
      router.back();
    }
  } else {
    router.back();
  }
}, [isAndroidWebView, router, removeLastHistory]);
```

### localStorage 사용 시 주의사항

history 스택을 localStorage에 저장할 때는 다음 사항들을 고려하면 좋을 것 같다.

1. 타임스탬프를 함께 저장하여 나중에 시간 기반 디버깅이 가능하도록 한다.
2. 앱 종료 시나 브라우저 새로고침 시에도 history가 유지되므로, 적절한 시점에 초기화가 필요할 수 있다.
3. localStorage 용량 제한을 고려하여 history 스택의 최대 크기를 제한하는 것이 좋다.

## 결론

웹뷰 환경에서의 history 관리는 생각보다 까다로운 문제다. 특히 Next.js와 같은 프레임워크를 사용할 때는 더욱 그렇다. 가끔은 복잡한 해결책보다는 단순한 해결 방법이 효율적일 때가 있다. localStorage를 활용한 해결책은 단순하면서도 효과적이며, 다른 라우팅 라이브러리를 사용하는 경우에도 응용할 수 있다.
