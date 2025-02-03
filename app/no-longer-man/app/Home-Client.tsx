'use client';

import Image from 'next/image';
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
      generateResponse(input);
    }
  };

  return (
    <section className="p-4 min-h-screen bg-blue-100">
      <Image
        src="/no_longer_human.png"
        alt="no-longer-human"
        className=""
        width={300}
        height={300}
      />
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">
            <div className="text-pink-500" />
            인간이었나 오늘?
            <div className="text-pink-500" />
          </div>
          <p className="text-gray-600"></p>
        </div>
        <div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"></label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="오늘 나는..."
                className="p-3 w-full h-32 resize-none outline-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin" />
                  생각하는 중...
                </>
              ) : (
                <>
                  <div className="mr-2 h-4 w-4" />
                  긍정적으로 바라보기
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-800 rounded-lg">
                {error}
              </div>
            )}

            {response && !error && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-lg text-purple-800 text-center leading-relaxed">
                  {response}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
