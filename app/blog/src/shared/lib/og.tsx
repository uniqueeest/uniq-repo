import { ImageResponse } from 'next/og';
import { NICKNAME } from '@shared/constants/nickname';

export const OG_SIZE = { width: 1200, height: 630 };

/** Satori는 woff2를 못 읽어서, 필요한 글자만 Google Fonts에서 ttf로 받아온다 */
const loadFont = async (text: string) => {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null; // 오프라인 빌드에서도 이미지 생성은 계속한다
  }
};

export const renderOgImage = async (title: string, sub?: string) => {
  const font = await loadFont(`${NICKNAME}${title}${sub ?? ''}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#fafaf8',
          color: '#18181b',
          fontFamily: 'Noto Sans KR',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: '#3f6212' }}>{NICKNAME}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.25, letterSpacing: -1.5 }}>
            {title}
          </div>
          {sub && <div style={{ fontSize: 30, color: '#55555c' }}>{sub}</div>}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [{ name: 'Noto Sans KR', data: font, weight: 700 }] : undefined,
    },
  );
};
