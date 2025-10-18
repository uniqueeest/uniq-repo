---
title: 'Set을 제대로 써보기'
description: '알고리즘에서만 사용하던 Set. 유용하게 써보기'
date: '2025-10-18T00:00:00Z'
tag: ['frontend', 'javascript']
id: 'set-object'
---

`Set`은 고유한 값들의 집합을 다루는 자료구조이다. 우리는 알고리즘 공부를 하면서 이 `Set` 객체를 많이 사용하지만, 실무에서 우리에게 익숙한 배열에 밀려 사용하지 않을 때가 많다. 아니면 필요하지 않은 부분에서 오남용하기도 한다. 이 `Set`를 잘 활용하면 많은 부분에서 유용하게 사용할 수 있다.

## Set

이 `Set`은 ECMAScript 2015 (ES6)에서 추가된 자료구조로, **중복되지 않는 값들의 모음**이다. 즉, 동일한 값은 한 번만 저장된다.

그렇다면, 이 `Set`은 우리가 일반적으로 사용하는 배열과 무엇이 다를까? 가장 큰 차이점을 설명하라면 배열은 index 기반의 순차적 리스트지만, `Set`은 해시 코드를 사용해서 해시 테이블에 키를 저장하는 방식이라고 이해하면 될 것이다.

그래서 우리가 알고리즘을 풀다보면 배열은 index대로 순차적으로 진행하기 때문에 O(n)의 시간 복잡도를 가지지만, `Set`, `Map`과 같은 자료구조는 값을 찾을 때, 평균 O(1)의 시간복잡도를 가진다는 것을 배웠던 것이다.

### 해시 테이블

그렇다면 해시 테이블은 어떻게 사용되길래 O(1)의 시간 복잡도를 가질 수 있는걸까?

간단히 설명하자면 "무작정 한 집씩 찾아가는가" 와 "정확한 주소를 들고 그 위치로 바로 가는가"의 차이일 것이다. 여기서 핵심은 **어떻게 그 주소를 즉시 계산하는가**이며, 그 역할을 하는 것이 해시 함수(Hash Function)이다.

`Set`의 동작 과정을 간단히 도식화 하면 이렇다.

1. 저장 (Set.add): `Set.add('apple')`을 호출하면, `Set`은 내부적으로 'apple'이라는 값을 해시 함수에서 통과시킨다.
2. 주소 계산: 해시 함수는 'apple'이라는 문자열을 기반으로 특정 숫자(해시 코드)를 즉시 계산해낸다. (예: hash('apple') -> 52)
3. 이 숫자 '52'를 내부 저장소(버킷 배열)의 인덱스(주소)로 사용하여 'apple' 값을 52번 버킷에 저장한다.
4. 탐색 (Set.has): 나중에 `Set.has('apple')`을 호출하면, 'apple'을 동일한 해시 함수에 다시 통과시켜 즉시 '52'라는 인덱스를 얻어낸다.
5. 결과 확인: 배열처럼 0번 인덱스부터 순회하는 것이 아니라, 52번 인덱스로 직행하여 값이 있는지 확인한다.

이 과정에서 데이터의 총 개수(n)가 100만 개든 10개든, 해시 함수가 '주소'를 계산하는 시간은 거의 일정하다. 이것이 `Set.has`가 평균 O(1)의 시간 복잡도를 갖는 원리이다.

**해시 충돌**

'apple'과 'banana'가 우연히 같은 해시 함수 결과(예: '52')를 반환할 수 있다. 이를 **해시 충돌**이라 부른다. 이렇게 된다면 V8엔진은 52번 버킷에 'apple'과 'banana'를 연결 리스트 등으로 함께 저장한다. `Set.has('banana')`를 호출하면, 52번 버킷까지는 O(1)로 가지만, 그 안에서 'apple'인지 'banana'인지 다시 비교해야 한다. 사실 V8의 해시 함수는 매우 잘 구현되어 있기 때문에 이런 일이 거의 발생하지는 않겠지만 이러한 이유 때문에 최악의 경우 O(n)의 시간복잡도를 갖기도 한다고 말하는 것이다.

### 벤치마크

100만개의 고유 값을 가진 배열을 만들고, `Array.includes`와 `Set.has`의 시간 차이를 측정했다.
MISS는 최악 시나리오 즉, 존재하지 않는 값을 탐색하는 시간이다. HIT는 중간 정도의 값을 탐색하는 시간이다. 확연히 차이가 나는 것을 볼 수 있다.

| 테스트 항목              | 평균 실행 시간 (ms) | guard 값 |
| ------------------------ | ------------------- | -------- |
| Array.includes (HIT mid) | **1.131**           | 0        |
| Array.includes (MISS)    | **2.205**           | 0        |
| Set.has (HIT)            | **0.001**           | 0        |
| Set.has (MISS)           | **0.000**           | 0        |

### 우리가 자주 볼 수 있는 코드들

실생활에서 우리는 얼마나 익숙하다는 이유로 배열을 사용하고 있을까? 자주 보이는 코드를 들고 왔다.

1. 목록을 조회

```tsx
// bannedUserIds: string[] (50,000개 항목)
// allUsers: User[] (100개 항목)

const UserList = ({ allUsers, bannedUserIds }) => {
  return (
    <ul>
      {allUsers.map((user) => (
        <li key={user.id}>
          {user.name}
          {/* 매 렌더링마다, 매 map마다 O(N) 탐색 실행 */}
          {bannedUserIds.includes(user.id) && <span> (차단됨)</span>}
        </li>
      ))}
    </ul>
  );
};
```

이것을 `Set`을 사용한다면 아래처럼 사용할 것이다.

```tsx
// bannedUserIds: string[] (50,000개 항목)
// allUsers: User[] (100개 항목)

const UserList = ({ allUsers, bannedUserIds }) => {
  const bannedUserIdSet = React.useMemo(() => {
    return new Set(bannedUserIds);
  }, [bannedUserIds]);

  return (
    <ul>
      {/* 이 map 루프는 O(M) */}
      {allUsers.map((user) => (
        <li key={user.id}>
          {user.name}
          {/* Set.has는 O(1) */}
          {bannedUserIdSet.has(user.id) && <span> (차단됨)</span>}
        </li>
      ))}
    </ul>
  );
};
```

2. '고유 목록'을 관리하는 경우

```tsx
const TagManager = () => {
  const [tags, setTags] = React.useState<string[]>(['react', 'typescript']);

  const addTag = (newTag: string) => {
    // 1. 중복 검사를 위한 O(n) 탐색
    if (!tags.includes(newTag)) {
      // 2. 불변성 유지를 위한 O(n) 복사
      setTags([...tags, newTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    // 1. 불변성 + 항목 제거를 위한 O(n) 필터링
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // ... render ...
};
```

`Set` 자료구조 자체가 중복을 허용하지 않기 때문에, `include` 검사가 불필요하다. 코드의 의도가 '배열을 필터링 한다'가 아니라 '집합에서 삭제한다.'로 명확해진다.

```tsx
const TagManager = () => {
  const [tags, setTags] = React.useState(new Set(['react', 'typescript']));

  const addTag = (newTag: string) => {
    // Set이 중복을 알아서 처리. O(1)
    setTags((prevSet) => {
      // 불변성 유지를 위해 새로운 Set 생성 (O(n) 복사)
      const newSet = new Set(prevSet);
      newSet.add(newTag); // O(1)
      return newSet;
    });
  };

  const removeTag = (tagToRemove: string) => {
    // O(1)
    setTags((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(tagToRemove); // O(1)
      return newSet;
    });
  };

  // ... render ...
};
```

### Set이 불필요한 경우

하지만 이 `Set`가 만능인 것은 아니다. 어떤 자료구조든지 남용하면 안 쓰느니만 못하다. `Set`을 사용함으로써 성능이나 가독성을 놓치는 경우들이 있다.

1. 인덱스(Index) 기반 접근이 필요한 경우

`Set`은 값이 '존재하는지'가 중요하며, '몇 번째에 있는지'는 관리하지 않는다. `arr[0]`와 같은 O(1) 인덱스 접근이 불가능하다.

2. 데이터가 매우 작고 고정적인 경우

이러한 경우에는 `Array.include()`를 사용해도 충분하다. 배열을 사용하면 가독성이 보장되고 오히려 `new Set()`을 생성하는 오버헤드가 더 커질 수 있다.

3. `map()`, `filter()`, `reduce()`가 주 용도인 경우

Set은 이러한 고차 함수 메서드를 내장하고 있지 않다. `[...mySet].map(...)`처럼 매번 배열로 변환(O(n))해야 하며, 이는 새로운 배열을 생성하는 추가 비용을 발생시킨다. 데이터 탐색 없이 변형만 한다면 배열이 훨씬 효율적일 수 있다.

4. JSON 직렬화가 필요한 경우

Set 객체는 `JSON.stringify()`로 직접 변환되지 않는다. `JSON.stringify(new Set([1, 2]))`의 결과는 "[1, 2]"가 아닌 "{}"이다. 데이터 전송(API 요청/응답)을 위해서는 `Array.from(mySet)` 변환이 강제된다.

`Set`을 사용할지 배열을 사용할지는 여러 상황을 고려해야겠지만, 아래와 같은 기준들에 따라 판단하는 것도 가능할 것이다.

- 이 데이터의 핵심은 '존재 여부'인가, '순서/위치'인가?
- 데이터의 크기가 커질 가능성이 있는가?
- 데이터를 주로 '탐색'하는가, '변형(map/filter)'하는가?

한 번 익숙한 배열에서 벗어나, 목적에 맞는 자료구조를 선택하는 도전을 해보자. 성능 최적화의 첫걸음이 될 수 있다.
