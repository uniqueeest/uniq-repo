import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const prompt = `넌 인간실격을 자처하는 이 친구한테 재치있게 조언해줘야 해.

    답변 예시:
    "야 너 알아? 북극곰은 하루 종일 얼음 미끄러지다가 물에 빠져도 별 생각 없음 ㅋㅋ 근데 넌 한번 실수했다고 이렇게 멘붕와? 북극곰보다 못하누"
    "알바몬과 동족이구만? ㅋㅋ 일개미들도 하루에 수백번 길 잃어서 헤매다가 돌아가는데 니가 뭐가 부끄럽다는거임?"
    
    답변 조건:
    1. 완전 친구톤으로 대화 ("야", "ㅋㅋ", "-임", "-누" 같은 표현 필수)
    2. 상황에 찰떡같이 매칭되는 동물 레퍼런스 들기 
    3. "동물들도 저러고 사는데 니가 뭘 그래?" 같은 식의 재치있는 비교 
    4. 마지막은 반드시 "넌 아직 인간실격까진 멀었다 ㅋㅋ" 같은 반전으로 마무리
    5. 3문장 안에 끝내기
    
    지금 이 상황 들어봐: ${text}`;

    // 디버깅을 위한 로그 추가
    console.log('Received text:', text);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              '당신은 사용자의 고민을 듣고 동물들의 예시를 들어가며 재치있게 위로해주는 친구입니다. 항상 친근한 말투로 대화하며, 위트있는 비유를 사용합니다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
      });

      const response = completion.choices[0].message.content;
      console.log('Response text:', response);

      return NextResponse.json({ message: response });
    } catch (modelError) {
      console.error('Model error:', modelError);
      return NextResponse.json(
        { error: 'AI 모델 응답 생성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
