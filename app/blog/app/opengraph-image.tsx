import { OG_SIZE, renderOgImage } from '@shared/lib/og';

export const alt = 'uniqueeest';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage('개발과 AI, 그리고 일하며 생각한 것들을 기록합니다.');
}
