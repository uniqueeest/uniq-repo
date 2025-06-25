---
title: 'TanStack Query의 선택적 구독 메커니즘 분석'
description: 'Tanstack Query는 어떻게 서버 데이터를 관리할까?'
date: '2025-03-08T00:00:00Z'
tag: ['frontend', 'react']
id: 'tanstack-query-mechanism'
---

React 애플리케이션에서 상태 관리는 항상 중요한 고려 사항이다. Context API는 간단하게 전역 상태를 관리할 수 있는 방법을 제공하지만, 불필요한 재렌더링이라는 단점이 있다. 이에 비해 TanStack Query(이전의 React Query)는 상태 관리, 특히 서버 데이터를 위한 효율적인 솔루션을 제공한다. TanStack Query가 어떻게 Context API의 한계를 극복하고 선택적 구독 메커니즘을 구현했는지 살펴보려고 한다.

## Observer 패턴이란

Observer 패턴은 소프트웨어 디자인에서 널리 사용되는 행동 디자인 패턴이다. 이 패턴에서는 객체(Subject)가 자신의 상태 변화를 다른 객체들(Observers)에게 자동으로 알린다.

Observer 패턴의 핵심 구성 요소:

- Subject(주체): 관찰되는 객체로, 관찰자 목록을 유지하고 변경 사항이 있을 때 이들에게 알림을 보냄.
- Observer(관찰자): Subject의 변경 사항에 반응하는 객체.
- 구독 메커니즘: Observer가 Subject에 등록하고 해지할 수 있는 인터페이스.
- 알림 메커니즘: Subject의 상태가 변경될 때 모든 Observer에게 알리는 방법.

아래는 간단한 Observer 패턴의 예시이다.

```js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

## TanStack Query의 선택적 구독 메커니즘

Tanstack Query는 Observer 패턴을 기반으로 하지만, 일반적인 구현보다 훨씬 더 정교하다. 특히 쿼리 키를 중심으로 구독 시스템을 구축하여 필요한 컴포넌트만 재렌더링되도록 최적화했다.

### 쿼리 키 기반 구독 시스템

Tanstack Query의 핵심은 '쿼리 키'이다. 각 쿼리는 고유한 키로 식별되며, 이 키는 구독 시스템의 기준점이 된다.

```ts
// 컴포넌트에서 특정 쿼리 키에 구독
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

이 코드를 실행하면, 컴포넌트는 ['todos'] 쿼리 키에 대한 관찰자로 등록된다. 해당 쿼리의 데이터가 변경될 때만 이 컴포넌트가 재렌더링된다.

### QueryClient와 QueryCache의 역할

TanStack Query의 내부 아키텍처에서 QueryClient와 QueryCache는 선택적 구독 시스템의 핵심이다.

```tsx
// QueryClient 생성
const queryClient = new QueryClient();

// Provider를 통해 애플리케이션에 제공
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

QueryCache는 모든 쿼리 인스턴스를 저장하고, 각 쿼리는 자신의 Observer 목록을 관리한다:

```ts
export class QueryCache extends Subscribable<QueryCacheListener> {
  #queries: Map<string, Query<any, any, any, any>> = new Map();
  #queriesMap: Map<QueryKey, QueryStoreItem[]> = new Map();
  #config: QueryCacheConfig;

  constructor(config?: QueryCacheConfig) {
    super();
    this.#config = config || {};
  }

  // 쿼리 키로 쿼리 조회
  find<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    filters: WithRequired<QueryFilters, 'queryKey'>,
  ): Query<TQueryFnData, TError, TData> | undefined {
    const defaultedFilters = { exact: true, ...filters };

    return this.getAll().find((query) =>
      matchQuery(defaultedFilters, query),
    ) as Query<TQueryFnData, TError, TData> | undefined;
  }

  // 쿼리 추가
  add(query: Query<any, any, any, any>): void {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);

      this.notify({
        type: 'added',
        query,
      });
    }
  }

  // 쿼리 알림 처리
  notify(event: QueryCacheNotifyEvent): void {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }

  // ...
}
```

### 실제 구현 분석

TanStack Query의 [소스 코드](https://github.com/TanStack/query)를 살펴보면, 구독 메커니즘이 어떻게 구현되어 있는지 더 자세히 알 수 있다. 핵심 파일은 `query.ts`와 `queryCache.ts`이다.

#### QueryObserver 클래스

`QueryObserver`는 컴포넌트와 쿼리 간의 연결고리 역할을 한다:

```ts
class QueryObserver<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Subscribable<QueryObserverListener<TData, TError>> {
  #client: QueryClient;
  #currentQuery: Query<TQueryFnData, TError, TQueryData, TQueryKey> =
    undefined!;
  #currentResult: QueryObserverResult<TData, TError> = undefined!;
  #trackedProps = new Set<keyof QueryObserverResult>();
  // ...

  constructor(
    client: QueryClient,
    public options: QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
  ) {
    super();
    this.#client = client;
    // 초기화 로직...
    this.setOptions(options);
  }

  // 구독 시 호출되는 메서드
  protected onSubscribe(): void {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);

      if (shouldFetchOnMount(this.#currentQuery, this.options)) {
        this.#executeFetch();
      } else {
        this.updateResult();
      }

      this.#updateTimers();
    }
  }

  // 구독 취소 시 호출되는 메서드
  protected onUnsubscribe(): void {
    if (!this.listeners.size) {
      this.destroy();
    }
  }

  // 쿼리 업데이트 알림을 받는 메서드
  onQueryUpdate(): void {
    this.updateResult();

    if (this.hasListeners()) {
      this.#updateTimers();
    }
  }

  // ...
}
```

#### Query 클래스

Query 클래스는 개별 쿼리의 상태와 관찰자를 관리한다:

```ts
export class Query
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  queryKey: TQueryKey
  queryHash: string
  observers: Array<QueryObserver<any, any, any, any, any>>
  state: QueryState<TData, TError>

  #cache: QueryCache
  #client: QueryClient
  ...

  constructor(config: QueryConfig<TQueryFnData, TError, TData, TQueryKey>) {
    this.#queryHash = config.queryHash
    this.#queryKey = config.queryKey
    this.#cache = this.#client.getQueryCache()
    this.#client = config.client
    this.state = config.state ?? this.#initialState
    // ...
  }

  // 옵저버 추가
  addObserver(observer: QueryObserver<any, any, any, any, any>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)

      // Stop the query from being garbage collected
      this.clearGcTimeout()

      this.#cache.notify({ type: 'observerAdded', query: this, observer })
    }
  }

  // 옵저버 제거
  removeObserver(observer: QueryObserver<any, any, any, any, any>): void {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer)

      if (!this.observers.length) {
        // If the transport layer does not support cancellation
        // we'll let the query continue so the result can be cached
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true })
          } else {
            this.#retryer.cancelRetry()
          }
        }

        this.scheduleGc()
      }

      this.#cache.notify({ type: 'observerRemoved', query: this, observer })
    }
  }


  // 상태 설정 메서드
  setState(
    state: Partial<QueryState<TData, TError>>,
    setStateOptions?: SetStateOptions,
  ): void {
    this.#dispatch({ type: 'setState', state, setStateOptions })
  }

  // 모든 옵저버에게 알림
  #dispatch(action: Action<TData, TError>): void {
    const reducer = (
      state: QueryState<TData, TError>,
    ): QueryState<TData, TError> => {
      switch (action.type) {
        // ... 타입 분기
      }
    }

    this.state = reducer(this.state)

    // 여러 업데이트를 그룹화하여 한 번의 렌더링 사이클로 처리
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate()
      })

      this.#cache.notify({ query: this, type: 'updated', action })
    })
  }
  // ...
}
```

#### useQuery 훅

마지막으로, `useQuery`훅은 이것을 모두 연결한다. 내부적으로는 `useBaseQuery` 함수를 살펴보면 된다. 이 함수를 통해 선택적 구독 메커니즘을 살펴볼 수 있다:

```ts
export function useBaseQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey,
>(
  options: UseBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >,
  Observer: typeof QueryObserver,
  queryClient?: QueryClient,
): QueryObserverResult<TData, TError> {
  const client = useQueryClient(queryClient);
  const defaultedOptions = client.defaultQueryOptions(options);

  // 옵저버 생성 - useState를 사용해 컴포넌트 생명주기 동안 유지
  const [observer] = React.useState(
    () =>
      new Observer<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
        client,
        defaultedOptions,
      ),
  );

  // 낙관적 결과 가져오기 - 데이터 페칭 전에도 UI에 표시할 수 있는 결과
  const result = observer.getOptimisticResult(defaultedOptions);

  // React 18의 useSyncExternalStore를 사용한 구독 설정
  React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe
          ? observer.subscribe(notifyManager.batchCalls(onStoreChange))
          : noop;

        // 구독 설정과 옵저버 생성 사이의 업데이트를 놓치지 않도록 결과 갱신
        observer.updateResult();

        return unsubscribe;
      },
      [observer, shouldSubscribe],
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult(),
  );

  // 옵션 변경 시 옵저버 업데이트
  React.useEffect(() => {
    // 옵션 변경은 이미 낙관적 결과에 반영되어 있으므로 리스너에게 알리지 않음
    observer.setOptions(defaultedOptions, { listeners: false });
  }, [defaultedOptions, observer]);

  // 결과 속성 사용 추적 - 필요한 속성만 추적하여 성능 최적화
  return !defaultedOptions.notifyOnChangeProps
    ? observer.trackResult(result)
    : result;
}
```

## 구독 메커니즘 흐름 분석

1. 컴포넌트에서 useQuery 호출
2. QueryObserver 인스턴스 생성 (useBaseQuery 내부)
3. Query 객체와의 연결 (QueryObserver 생성자 내부):
   QueryObserver가 생성될 때 내부적으로 다음과 같은 과정이 진행된다.

- QueryClient를 통해 해당 쿼리 키의 Query 객체 찾기 또는 생성
- QueryObserver가 Query 객체에 자신을 등록

4. React 컴포넌트 구독 설정 (useSyncExternalStore 사용)
5. 데이터 변경과 알림 전파

결국 **쿼리 키를 기준으로 구독이 분리**된다는 것이 핵심이다. 각 쿼리 키마다 별도의 Query 객체가 생성되고, 특정 쿼리 키에 관심 있는 컴포넌트만 해당 Query 객체에 연결된다.

## 결론

TanStack Query의 구독 메커니즘은 단순한 서버 데이터 관리를 넘어, 효과적인 상태 관리 패턴을 제시한다:

- 구독 기반 아키텍처: 관심사에 따라 상태 변화를 구독할 수 있는 패턴을 제공
- React와의 효율적인 통합: useSyncExternalStore를 활용한 React 통합은 다른 상태 관리 라이브러리에도 적용할 수 있는 패턴
- 변경 감지 최적화: 선택적 구독과 배치 처리를 통해 상태 변경 시 최소한의 컴포넌트만 업데이트

Tanstack Query 코드를 톺아보며, 어떤 식으로 Tanstack Query가 구현되고 있는지 흐름을 조금이나마 파악하고, Query키를 통해 데이터 변경을 어떤 식으로 하는지를 확인 할 수 있는 유익한 시간이었다.

### 참고 자료

[Tanstack Query 공식 문서](https://tanstack.com/query/latest/docs/framework/react/overview)

[Tanstack Query GitHub](https://github.com/TanStack/query)

[Observer](https://refactoring.guru/design-patterns/observer)

[Observer Pattern](https://www.patterns.dev/vanilla/observer-pattern)
