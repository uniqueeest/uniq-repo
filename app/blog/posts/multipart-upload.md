---
title: '멀티파트 업로드로 API Gateway 제한 극복하기'
description: ''
date: '2024-10-28T00:00:00Z'
---

최근 프로젝트에서 파일 업로드 구현 중 AWS API Gateway의 10MB 제한에 부딪혔다.

이 글에서는 이 제한을 어떻게 극복했는지, 그 과정에서 만난 문제들과 해결 방법을 공유하고자 한다.

## API Gateway의 제한과 그 이유

AWS API Gateway REST API에는 10MB라는 요청/응답 본문 크기 제한이 있다. AWS가 이런 제한을 둔 데에는 몇 가지 중요한 이유가 있다:

1. **서버 리소스 보호**: 대용량 파일 처리는 서버에 상당한 부하를 줄 수 있다.
2. **비용 효율성**: 큰 파일 전송은 대역폭 비용 증가로 이어진다.
3. **성능 최적화**: 작은 크기의 페이로드가 더 빠른 응답 시간을 보장한다.

## 초기 접근: 청크 기반 순차 업로드

처음에는 파일을 청크로 나누어 순차적으로 업로드하는 방식을 시도했다. 각 청크(5MB 기준)를 API로 전송하고, 성공 응답을 받은 후에 다음 청크를 전송하는 방식이었다.

하지만 이 방식에는 심각한 성능 문제가 있었다:

- 각 청크 요청당 2~3초 소요
- 전체 업로드 시간이 청크 수에 비례하여 증가 (3n초)

## 개선된 접근: 병렬 업로드

성능 문제를 해결하기 위해 `Promise.all`을 사용한 병렬 업로드 방식으로 전환했다. 이를 통해 전체 업로드 시간을 3~4초로 크게 단축할 수 있었다.

```ts
const uploadFile = async (file: File) => {
  // 5MB 단위로 분할
  const CHUNK_SIZE = 5 * 1024 * 1024;
  const chunks = Math.ceil(file.size / CHUNK_SIZE);

  // 멀티파트 업로드 시작
  const { uploadId } = await startMultipartUpload(file.name);

  // 청크 병렬 업로드
  const uploadPromises = [];
  for (let i = 0; i < chunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    uploadPromises.push(uploadPart(chunk, i + 1, uploadId, file.name));
  }

  // 모든 파트 업로드 완료 대기
  const parts = await Promise.all(uploadPromises);

  // 멀티파트 업로드 완료
  await completeMultipartUpload(uploadId, file.name, parts);
};
```

## 백엔드 이슈와 최종 해결책

병렬 업로드 구현 후에도 백엔드에서 새로운 문제가 발생했다. 청크 파일들이 제대로 합쳐지지 않고 마지막 청크만 S3에 저장되는 현상이었다.

이 문제를 해결하기 위해 pre-signed URL을 활용한 직접 업로드 방식으로 전환했다.

1. 백엔드에 총 청크 수를 전송
2. 백엔드에서 각 청크에 대한 pre-signed URL 생성
3. 각 청크를 해당 URL로 직접 업로드

```ts
const response = await fetch(uploadUrl, {
  method: 'PUT',
  body: chunk,
});

// ETag를 응답 헤더에서 추출
const etag = response.headers.get('ETag');
```

### Pre-signed URL 사용 시 주의사항

Pre-signed URL로 업로드할 때는 Content-Type을 주의해서 다뤄야 한다. URL 생성 시 이미 Content-Type이 포함되어 있으므로, 추가로 헤더를 설정하면 서명 불일치로 인한 오류가 발생할 수 있다.

## 결론

API Gateway의 제한은 얼핏 귀찮은 제약처럼 보일 수 있지만, 실제로는 서비스의 안정성과 효율성을 위한 합리적인 제한이다. 이를 우회하기 위한 여러 방법이 있지만, pre-signed URL을 활용한 직접 업로드 방식이 가장 효율적인 해결책이 될 수 있다.
