import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: '서버 환경변수 GOOGLE_API_KEY가 설정되지 않았습니다.' },
        { status: 500 },
      );
    }

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'text 필드가 필요합니다.' },
        { status: 400 },
      );
    }

    const systemPrompt = `당신은 신뢰성 있는 뉴스 분석가입니다. 사용자가 제공한 미국 뉴스 기사 내용을 한국어로 명확하고 간결하게 요약합니다.

**원칙:**
- **사실 우선:** 기사에 언급된 정보만을 사용하여 요약하며, 과장이나 추측은 절대 금지합니다.
- **객관적 어조:** 중립적이고 담백한 전문가의 시각으로 작성합니다.
- **한국 독자 고려:** 최소한의 배경 맥락만 간결하게 제공합니다.
- **불충분한 정보:** 본문이 100자 미만이거나, 기사의 주요 정보(주체, 사건, 결과)를 파악하기에 불충분할 경우, 즉시 '본문 필요'라고만 응답합니다.

**출력 형식:**
제목: <기사의 핵심을 담은 한글 제목>
요약: <기사 전체를 아우르는 한 문장 요약>
핵심 포인트:
- <요약을 뒷받침하는 주요 사실 1>
- <주요 사실 2>
- <주요 사실 3>
왜 중요한가: <이 뉴스가 가진 의미나 파급효과를 설명하는 한 단락>
주의/논란: <기사에 언급된 비판이나 논쟁의 여지가 있는 내용을 한 문장으로 요약. 해당 내용이 없을 경우 생략>`;

    // 입력값이 URL이라고 가정하고 본문을 크롤링/추출
    let articleText = '';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(text, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.9,ko;q=0.8',
          referer: 'https://www.investing.com/',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'upgrade-insecure-requests': '1',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        const html = await res.text();
        const dom = new JSDOM(html, { url: text });
        const doc = dom.window.document;
        const reader = new Readability(doc);
        const parsed = reader.parse();
        let rawText = parsed?.textContent?.trim() ?? '';

        // Fallback 1: DOM 셀렉터(야후 caas 등)
        if (!rawText || rawText.length < 400) {
          const selectorCandidates = [
            '.caas-body p',
            'article p',
            '[data-test-locator="story-container"] p',
            '.article-body p',
            '.post-content p',
            '.news-article p',
          ];

          for (const sel of selectorCandidates) {
            const nodeList = doc.querySelectorAll(sel);
            if (nodeList.length > 0) {
              const nodes: HTMLElement[] = Array.from(
                nodeList,
              ) as unknown as HTMLElement[];
              const joined = nodes
                .map((p) => (p.textContent ?? '').toString().trim())
                .filter((t) => t.length > 0)
                .join('\n');
              if (joined.length > rawText.length) {
                rawText = joined;
              }
            }
          }
        }

        // Fallback 2: JSON-LD에서 articleBody 추출
        if (!rawText || rawText.length < 400) {
          const ldList = doc.querySelectorAll(
            'script[type="application/ld+json"]',
          );
          const ldScripts: HTMLScriptElement[] = Array.from(
            ldList,
          ) as unknown as HTMLScriptElement[];
          for (const s of ldScripts) {
            try {
              const textContent = s.textContent ?? '';
              if (!textContent) continue;
              const parsedUnknown: unknown = JSON.parse(textContent);
              const items: unknown[] = Array.isArray(parsedUnknown)
                ? parsedUnknown
                : [parsedUnknown];
              for (const item of items) {
                if (typeof item !== 'object' || item === null) continue;
                const rec = item as Record<string, unknown>;
                const typeVal = rec['@type'];
                const isNews =
                  (typeof typeVal === 'string' &&
                    (typeVal === 'NewsArticle' || typeVal === 'Article')) ||
                  (Array.isArray(typeVal) &&
                    (typeVal as unknown[]).includes('NewsArticle'));
                if (!isNews) continue;
                const bodyVal = rec['articleBody'] ?? rec['description'];
                if (
                  typeof bodyVal === 'string' &&
                  bodyVal.length > rawText.length
                ) {
                  rawText = bodyVal;
                }
              }
            } catch {}
          }
        }

        // Fallback 3: r.jina.ai 프록시로 텍스트 뷰 가져오기
        if (!rawText || rawText.length < 400) {
          try {
            const proxied =
              'https://r.jina.ai/http/' + text.replace(/^https?:\/\//, '');
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2000); // ⏱️ 2초 제한
            const r2 = await fetch(proxied, {
              headers: {
                'user-agent':
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36',
              },
              signal: controller.signal,
            });
            clearTimeout(timeout);

            if (r2.ok) {
              const t2 = await r2.text();
              if (t2 && t2.length > rawText.length) rawText = t2;
            }
          } catch (err) {
            console.warn('Fallback 3 (jina.ai) failed:', err);
          }
        }

        // 너무 긴 텍스트는 잘라서 요약 효율 유지
        articleText =
          rawText.length > 24000 ? rawText.slice(0, 24000) : rawText;
      }
    } catch (e) {
      console.warn('Fetch/Parse failed for URL:', text, e);
    }

    const userPrompt = articleText
      ? `[기사 URL]\n${text}\n\n[기사 본문]\n${articleText}\n\n요구사항:\n- 위 출력 형식을 따르세요.\n- 한국어로 작성하세요.`
      : `[기사 URL]\n${text}\n\n[기사 본문]\n(제공되지 않음)\n\n요구사항:\n- 본문이 없으므로 즉시 \"본문 필요\"라고만 답하세요.`;

    // 디버깅을 위한 로그 추가
    console.log('Received text:', text);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContentStream({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: userPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (modelError) {
          console.error('Model stream error:', modelError);
          controller.error(modelError);
          return;
        }
        controller.close();
      },
    });

    // Fetch API와 ReadableStream을 통한 클라이언트 소비를 고려해 text/plain으로 스트림 반환
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
