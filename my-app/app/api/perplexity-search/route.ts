import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { generateText } from "ai"

const perplexity = createOpenAICompatible({
  name: "perplexity",
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai/",
})

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    if (!query) {
      return new Response(
        JSON.stringify({
          error: "Query is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY is not set")
    }

    const { text } = await generateText({
      model: perplexity("llama-3.1-sonar-small-128k-online"),
      prompt: `You are a medical AI assistant. Provide helpful and accurate information about symptoms, first aid, and general medical advice. If the situation seems serious, always recommend seeking professional medical help. 

Query: ${query}

Response:`,
    })

    if (!text) {
      throw new Error("No response generated")
    }

    return new Response(JSON.stringify({ result: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Perplexity API Error:", error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

