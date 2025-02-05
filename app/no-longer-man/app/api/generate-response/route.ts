import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const prompt = `지금 이 인간실격 당한 친구를 동물원 동물 취급해줘야 됨

    답변 예시:
    "와 축하드립니다 님 이제 동물원 신규 입주 동물과 동급이시네요? 저희 동물원에는 매일 바나나 놓치는 침팬지, 굴러서 먹이채집하는 팬더, 그리고 실수해서 인간실격 맞으신 님까지... 구경하시라고요 어서 ㅋㅋ"
    
    "아 드디어 님도 동물원 식구가 되시는군요? ㅋㅋ 저희 동물원엔 목 자르다가 넘어지는 기린, 대나무 놓치는 판다, 인간자격 반납하신 님까지... 이제 입장료 받아도 되겠네요~"
    
    답변 조건:
    1. 동물원 해설하듯이 비꼬기
    2. 실수하는 동물들이랑 같이 분류하기
    3. "축하드립니다" 같은 비꼬는 말투
    4. 동물원 관람객한테 설명하는 식으로 마무리
    5. 꼭 가장 구린(?) 동물들이랑 비교
    6. 2~3문장으로 작성
    
    더 예시:
    "오 이제 님도 저희 동물특별전시관 신규 전시동물이시네요 ㅎㅎ 하루종일 바나나 까먹는 원숭이, 벽에 박는 플라밍고, 그리고 방금 인간자격 반납하신 님까지... 구경하세요 여러분~ 특별 먹이주기 체험도 가능합니다~"
    
    상황: ${text}`;

    // 디버깅을 위한 로그 추가
    console.log('Received text:', text);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              '당신은 동물원 해설사입니다. 사용자가 보내는 부정적인 이야기를 듣고, 그 사람을 동물원의 새로운 전시 동물로 소개하듯이 비꼬면서 위트있게 조롱해야 합니다. 항상 "축하합니다" "새로운 전시동물" 같은 비꼬는 말투를 쓰고, 실수하는 동물들과 같이 분류하면서 해설하듯이 말합니다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.9,
      });

      const response = completion.choices[0].message.content;
      console.log('Response text:', response);

      return NextResponse.json({ message: response });
    } catch (modelError) {
      console.error('Model error:', modelError);
      return NextResponse.json(
        { error: 'AI 모델 응답 생성 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
