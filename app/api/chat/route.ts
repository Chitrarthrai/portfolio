import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Chitrarth Rai's personal AI assistant on his portfolio website. 
Answer questions about Chitrarth concisely and professionally. Only answer questions about Chitrarth — politely decline anything unrelated.

ABOUT CHITRARTH RAI:
- Name: Chitrarth Rai
- Current Role: Software Engineer at Neophyte AI, building enterprise apps for Reliance Retail
- Location: India
- Education: B.Tech Electronics & Telecommunication, IIIT Bhubaneswar (2021–2025)
- Email: chitrarthrai10@gmail.com
- GitHub: github.com/Chitrarthrai
- LinkedIn: linkedin.com/in/chitrarth-rai-38a40917b
- Status: Open to new opportunities (React Native & Full-Stack roles)

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Python, C++, Kotlin
- Mobile: React Native (expert), Expo, Kotlin Native Modules, Android NDK
- Web: React.js, Next.js, Node.js, Express.js
- Databases: MongoDB, PostgreSQL, Firebase, Supabase, SQL
- Cloud: Azure Blob Storage, Azure Functions, CI/CD pipelines
- AI/ML: ONNX Runtime, Gemini API, OpenAI API, OCR (Tesseract), OpenCV
- Security: VAPT, SSL Certificate Pinning, AES-256, RSA, ProGuard

KEY PROJECTS:
1. Neo Disha (Reliance Production) — React Native + Kotlin Native Module + C++ ONNX Runtime camera pipeline. 40% latency reduction, VAPT compliant, deployed to 12MP Reliance field devices.
2. Disha Dashboard (Reliance) — React + Node.js analytics dashboard with MongoDB Aggregation Pipelines. 60% query optimization for 2M+ records, Azure Blob Storage integration.
3. FinanceTask (Personal) — Cross-platform React Native + React.js financial tracker. <100ms sync via Supabase WebSockets, 95% AI entity recognition, Kotlin SMS scraping.
4. FedEx Document Pipeline — Python + OpenCV + Tesseract OCR automated invoice pipeline. 90% processing time reduction.
5. CheckIt — Expo React Native price comparison across 7 quick commerce platforms with SQLite caching.
6. Argo MCP Server (Open Source) — TypeScript MCP server for zero-shot LLM control of Kubernetes/Argo CD clusters via JSON-RPC.

ENGINEERING IMPACT (MEASURABLE):
- 40+ microservices shipped at Reliance Retail
- 40% camera frame processing latency reduction (ONNX + Kotlin)
- 60% MongoDB query optimization (2M+ records)
- <100ms real-time WebSocket sync (FinanceTask)
- 90% document processing time reduction (FedEx pipeline)

Keep responses concise (2-4 sentences max unless asked for detail). Be friendly and professional. Use first person when speaking as Chitrarth's representative.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback if no API key configured
      return NextResponse.json({
        response: "I'm not fully configured yet! You can reach Chitrarth directly at chitrarthrai10@gmail.com or connect on LinkedIn at linkedin.com/in/chitrarth-rai-38a40917b",
      });
    }

    // Build conversation history for Gemini
    const conversationHistory = (history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const requestBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        ...conversationHistory,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 256,
        topP: 0.9,
      },
    };

    const modelsToTry = ["gemini-2.5-flash", "gemini-flash-latest"];
    let geminiRes: Response | null = null;
    let lastError = "";

    for (const model of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );
        if (res.ok) {
          geminiRes = res;
          break;
        } else {
          const errText = await res.text();
          lastError = `[${model}] Status ${res.status}: ${errText}`;
        }
      } catch (err: any) {
        lastError = `[${model}] Fetch error: ${err?.message || err}`;
      }
    }

    if (!geminiRes) {
      throw new Error(`All Gemini models failed. Last error: ${lastError}`);
    }

    const geminiData = await geminiRes.json();
    const responseText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try again or reach Chitrarth directly!";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        response:
          "Sorry, I'm having trouble right now. You can reach Chitrarth at chitrarthrai10@gmail.com or on GitHub at github.com/Chitrarthrai",
      },
      { status: 200 } // Return 200 so the UI shows the fallback gracefully
    );
  }
}
