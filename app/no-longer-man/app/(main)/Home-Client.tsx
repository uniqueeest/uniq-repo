'use client';

import { useState } from 'react';
import { useGenerateData } from './_hook/useGenerateData';

export const HomeClientPage = () => {
  const [input, setInput] = useState('');

  const { data, isLoading, error, generateData, handleResetData } =
    useGenerateData();

  const handleReset = () => {
    handleResetData();
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      generateData(input);
    }
  };

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl p-4 lg:py-16">
        <div className="text-center space-y-3 mb-6 lg:mb-10">
          <h1 className="text-black text-3xl lg:text-5xl font-extrabold tracking-tight">
            미국 뉴스 요약
          </h1>
          <p className="text-gray-9 text-sm lg:text-base">
            링크 하나로 정확하고 간결한 요약을 실시간으로 받으세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-9">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
              스트리밍
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
              저장 안 함
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
              베타
            </span>
          </div>
        </div>

        <form
          className="bg-white rounded-xl shadow p-4 lg:p-5 space-y-4"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="newsUrl"
            className="block text-sm font-medium text-gray-9"
          >
            뉴스 기사 URL
          </label>
          <div className="flex items-stretch gap-2">
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
              className="flex-1 h-12 px-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-7"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-busy={isLoading}
              className="inline-flex justify-center items-center gap-2 h-12 px-4 rounded-lg bg-black text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '요약 중…' : '요약'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="inline-flex justify-center items-center h-12 px-3 rounded-lg text-gray-9 hover:bg-gray-3 disabled:opacity-50"
            >
              초기화
            </button>
          </div>
          <p id="url-help" className="text-xs text-gray-9 opacity-70">
            공개 뉴스 URL만 지원합니다. 유료/로그인 전용 페이지는 제한될 수
            있습니다.
          </p>
          {error && (
            <div role="alert" className="p-3 bg-red-1 text-red-9 rounded-lg">
              {error}
            </div>
          )}
        </form>

        <div className="mt-6 bg-white rounded-xl shadow p-4 lg:p-5">
          <h3 className="text-blue-9 font-semibold mb-2">요약 결과</h3>
          {!data && !error && !isLoading && (
            <div className="text-gray-9 text-sm space-y-1">
              <p>기사 링크를 입력해 요약을 시작하세요.</p>
              <p className="opacity-80">
                긴 기사일수록 시간이 조금 걸릴 수 있습니다.
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
          {data && !error && (
            <div aria-live="polite">
              <pre className="whitespace-pre-wrap break-words text-base lg:text-lg text-blue-9 text-left leading-relaxed">
                {data}
              </pre>
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="mt-3 p-3 bg-red-1 text-red-9 rounded-lg"
            >
              {error}
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-9 opacity-70">
          베타 서비스 · 결과는 원문/페이지 구조에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
};
