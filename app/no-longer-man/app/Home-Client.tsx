'use client';

import { useState } from 'react';

export const HomeClientPage = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <section className="p-4 min-h-screen bg-gray-5">
      <article className="flex flex-col gap-3 lg:gap-6 mx-auto max-w-2xl">
        <h1 className="text-center text-blue-9 text-xl font-semibold lg:text-3xl lg:font-bold">
          미국 뉴스 번역기
        </h1>
        <h2 className="text-center text-gray-9 text-sm lg:text-base">
          이곳에 미국 뉴스 링크를 붙여넣으면 요약해드립니다.
        </h2>
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="미국 뉴스 링크"
              className="p-3 w-full h-12 resize-none outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex justify-center items-center p-2 w-full bg-blue-7 hover:bg-blue-8 text-white cursor-pointer"
            >
              {isLoading ? '번역 중...' : '번역하기'}
            </button>

            {error && (
              <div className="p-4 bg-red-1 text-red-9 rounded-lg">{error}</div>
            )}

            {response && !error && (
              <div className="mt-6 p-4 bg-blue-1 rounded-lg">
                <pre className="whitespace-pre-wrap break-words text-lg text-blue-9 text-left leading-relaxed">
                  {response}
                </pre>
              </div>
            )}
          </form>
        </div>
      </article>
    </section>
  );
};
