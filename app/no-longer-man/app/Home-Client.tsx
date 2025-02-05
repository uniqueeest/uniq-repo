'use client';

import { useState } from 'react';
import Image from 'next/image';

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

      const data = await response.json();
      setResponse(data.message);
    } catch (err) {
      setError('죄송합니다. 잠시 후 다시 시도해주세요.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      setResponse('');
      generateResponse(input);
    }
  };

  return (
    <section className="p-4 min-h-screen bg-gray-5">
      <article className="max-w-sm mx-auto mb-4 lg:mb-6">
        <Image
          src="/no_longer_human.png"
          alt="no-longer-human"
          className="w-full"
          width={300}
          height={300}
        />
      </article>
      <article className="flex flex-col gap-3 lg:gap-6 mx-auto max-w-2xl">
        <h1 className="text-center text-blue-9 text-xl font-semibold lg:text-3xl lg:font-bold">
          인간이었나 오늘?
        </h1>
        <div>
          <div className="space-y-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="오늘 나는..."
              className="p-3 w-full h-32 resize-none outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="flex justify-center items-center p-2 w-full bg-blue-7 hover:bg-blue-8 text-white cursor-pointer"
            >
              {isLoading ? '생각하는 중...' : '긍정적으로 바라보기'}
            </button>

            {error && (
              <div className="p-4 bg-red-1 text-red-9 rounded-lg">{error}</div>
            )}

            {response && !error && (
              <div className="mt-6 p-4 bg-blue-1 rounded-lg">
                <p className="text-lg text-blue-9 text-center leading-relaxed">
                  {response}
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
