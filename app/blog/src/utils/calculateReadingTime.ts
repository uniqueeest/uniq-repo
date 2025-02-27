// 기본 설정
const DEFAULT_OPTIONS = {
  wordsPerMinute: 200,
  charsPerMinute: 500,
  wordsPerMinuteEng: 200,
  charsPerMinuteKor: 500,
  imageReadingTime: 10,
  round: 'round',
  minimumTime: 1,
};

const calculateReadingTime = (text: string, options = {}) => {
  const settings = { ...DEFAULT_OPTIONS, ...options };

  if (!text) return settings.minimumTime;

  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');

  const koreanChars = (cleanText.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g) || []).length;
  const nonKoreanText = cleanText.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
  const englishWords = nonKoreanText.trim().split(/\s+/).length;

  const koreanReadingTime = koreanChars / settings.charsPerMinuteKor;
  const englishReadingTime = englishWords / settings.wordsPerMinuteEng;

  const imageCount = (text.match(/<img[^>]+>/g) || []).length;
  const imageTime = (imageCount * settings.imageReadingTime) / 60;

  let totalTime = koreanReadingTime + englishReadingTime + imageTime;

  if (settings.round) {
    switch (settings.round) {
      case 'ceil':
        totalTime = Math.ceil(totalTime);
        break;
      case 'floor':
        totalTime = Math.floor(totalTime);
        break;
      default:
        totalTime = Math.round(totalTime);
    }
  }

  return Math.max(settings.minimumTime, totalTime);
};

const formatReadingTime = (minutes: number) => {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return `${seconds} sec read`;
  } else {
    return `${Math.round(minutes)} min read`;
  }
};

export const getReadingTime = (text: string, options = {}) => {
  const rawOptions = { ...options, round: null };
  const minutes = calculateReadingTime(text, rawOptions);
  return formatReadingTime(minutes);
};
