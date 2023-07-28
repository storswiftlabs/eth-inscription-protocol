export async function getChatGeneral() {
  return await fetch('/api/chat').then(e => e.json())
}
