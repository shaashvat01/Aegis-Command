import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { generateText } from "ai"
import { NextResponse } from "next/server"

interface RequestBody {
  query: string
}

const perplexity = createOpenAICompatible({
  name: "perplexity",
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai/",
})

export async function POST(req: Request) {
  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
    }

    const body = (await req.json()) as RequestBody

    if (!body.query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: perplexity("llama-3.1-sonar-small-128k-online"),
      prompt: `You are a military command AI assistant. Provide clear, concise, and tactical responses to mission-related queries. Always prioritize operational security and safety.

Query: ${body.query}

Response:`,
    })

    if (!text) {
      return NextResponse.json({ error: "No response generated" }, { status: 500 })
    }

    return NextResponse.json({ result: text })
  } catch (error) {
    console.error("Perplexity API Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred while processing your request" },
      { status: 500 },
    )
  }
}

