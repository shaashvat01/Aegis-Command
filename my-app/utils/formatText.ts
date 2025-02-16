export function formatText(text: string): string {
  // Split the text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []

  // Group sentences into paragraphs (every 2-3 sentences)
  const paragraphs = []
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join(" "))
  }

  // Add bullet points for lists (assuming lists start with numbers or dashes)
  const formattedParagraphs = paragraphs.map((para) => {
    if (para.match(/^(\d+[).]|-)\s/)) {
      return para
        .split(/\n/)
        .map((line) => `• ${line.replace(/^\d+[).]|-\s*/, "")}`)
        .join("\n")
    }
    return para
  })

  // Join paragraphs with double line breaks
  return formattedParagraphs.join("\n\n")
}

