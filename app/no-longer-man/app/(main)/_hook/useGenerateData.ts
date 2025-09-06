'use client';

import { useState } from 'react';

export const useGenerateData = () => {
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateData = async (text: string) => {
    try {
      setIsLoading(true);
      setError('');
      setData('');

      const response = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok || !response.body) {
        throw new Error('응답 생성에 실패했습니다.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setData(accumulated);
      }
    } catch (error) {
      setError('죄송합니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetData = () => {
    if (isLoading) return;
    setData('');
    setError('');
  };

  return { data, isLoading, error, generateData, handleResetData };
};
