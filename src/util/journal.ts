export function getJournalPreviewTitle(html: string): { parsedHeading: string; parsedParagraph: string; } {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  let parsedHeading = ""
  let parsedParagraph = "";
  const rawHeading = doc.querySelector('h1, h2, h3, h4, h5, h6')
  if (rawHeading) {
    parsedHeading = rawHeading.textContent?.trim() ?? ""
  }
    

  const rawParagraph = doc.querySelector('p')
  if (rawParagraph) {
    parsedParagraph =  rawParagraph.textContent?.slice(0, 50) + "..."
  }

  return {parsedHeading, parsedParagraph}
}
