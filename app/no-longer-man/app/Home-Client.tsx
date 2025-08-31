'use client';

import { useState } from 'react';

export const HomeClientPage = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    if (isLoading) return;
    setInput('');
    setResponse('');
    setError('');
  };

  const generateResponse = async (text: string) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('응답 생성에 실패했습니다.');
      }

      if (!response.body) {
        throw new Error('스트림 본문이 없습니다.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !doneReading });
          setResponse((prev) => prev + chunk);
        }
      }
    } catch (err) {
      setError('죄송합니다. 잠시 후 다시 시도해주세요.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setResponse('');
      generateResponse(input);
    }
  };

  return (
    <section className="min-h-screen bg-gray-5">
      <div className="mx-auto max-w-6xl p-4 lg:py-12">
        <header className="text-center space-y-3 mb-6 lg:mb-10">
          <h1 className="text-blue-9 text-3xl font-extrabold lg:text-5xl">
            미국 뉴스 요약
          </h1>
          <p className="text-gray-9 text-sm lg:text-base max-w-2xl mx-auto">
            링크를 붙여넣으면 신뢰할 수 있는 요약을 실시간으로 제공합니다.
            데이터는 저장하지 않습니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-9">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M6 12l4 4 8-8" stroke="currentColor" strokeWidth="2" />
              </svg>
              HTTPS 보안
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              저장하지 않음
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              빠른 스트리밍
            </span>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="bg-white rounded-xl shadow p-5 lg:p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="newsUrl"
                  className="block text-sm font-medium text-gray-9"
                >
                  뉴스 기사 URL
                </label>
                <input
                  id="newsUrl"
                  type="url"
                  inputMode="url"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="예: https://www.investing.com/..."
                  aria-invalid={Boolean(error)}
                  aria-describedby="url-help"
                  required
                  className="p-3 w-full h-12 rounded-lg border outline-none focus:ring-2 focus:ring-blue-7"
                />
                <p id="url-help" className="text-xs text-gray-9 opacity-70">
                  공개 뉴스 URL만 지원합니다. 유료/로그인 전용 페이지는 제한될
                  수 있습니다.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-busy={isLoading}
                  className="inline-flex justify-center items-center gap-2 h-12 w-full sm:w-auto px-4 rounded-lg bg-blue-7 hover:bg-blue-8 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading && (
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {isLoading ? '요약 중...' : '요약 생성'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="inline-flex justify-center items-center h-12 w-full sm:w-auto px-4 rounded-lg text-gray-9 hover:bg-gray-3 disabled:opacity-50"
                >
                  초기화
                </button>
              </div>

              {error && (
                <div
                  role="alert"
                  className="p-4 bg-red-1 text-red-9 rounded-lg"
                >
                  {error}
                </div>
              )}
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-5 lg:p-6 lg:sticky lg:top-8 max-h-[80vh] overflow-auto">
            <h3 className="text-blue-9 font-semibold mb-3">요약 결과</h3>
            {!response && !error && !isLoading && (
              <div className="text-gray-9 text-sm space-y-2">
                <p>왼쪽 입력창에 URL을 붙여넣고 요약을 생성하세요.</p>
                <p className="opacity-80">
                  긴 기사일수록 시간이 다소 소요될 수 있습니다.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center gap-3 text-gray-9">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>문서를 읽고 요약을 생성하는 중입니다…</span>
              </div>
            )}

            {response && !error && (
              <div aria-live="polite">
                <pre className="whitespace-pre-wrap break-words text-base lg:text-lg text-blue-9 text-left leading-relaxed">
                  {response}
                </pre>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mt-3 p-4 bg-red-1 text-red-9 rounded-lg"
              >
                {error}
              </div>
            )}
          </div>
        </main>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="p-5 bg-white rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2 text-blue-9 font-semibold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M12 3v7h7" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M20 12a8 8 0 11-8-8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              1. URL 확인
            </div>
            <p className="text-sm text-gray-9">
              입력한 링크의 접근 가능 여부를 확인합니다.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2 text-blue-9 font-semibold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 4h16v6H4z" stroke="currentColor" strokeWidth="2" />
                <path d="M4 14h10v6H4z" stroke="currentColor" strokeWidth="2" />
              </svg>
              2. 콘텐츠 파싱
            </div>
            <p className="text-sm text-gray-9">
              본문 텍스트를 추출해 요약에 필요한 핵심 정보를 준비합니다.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2 text-blue-9 font-semibold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L6 20l2-7L2 9h7z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              3. 요약 생성
            </div>
            <p className="text-sm text-gray-9">
              LLM을 활용해 신뢰할 수 있는 한글 요약을 생성합니다.
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-gray-9 opacity-70">
          베타 서비스 · 결과 품질은 원문/페이지 구조에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
};
