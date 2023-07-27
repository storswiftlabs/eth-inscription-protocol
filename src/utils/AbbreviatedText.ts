export function AbbreviatedText(text: string) {
  return text.length > 10 ? `${text.slice(0, 5)}...${text.slice(-5)}` : text
}
