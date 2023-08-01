export interface MessageOnChain {
  type: string
  title: string
  text: string
  image: string[]
  receiver: string[]
  at: string[]
  with: string
}
export function sendMessageOnChain(data: MessageOnChain) {
  return {
    type: data.type,
    title: data.title ?? '',
    text: data.text ?? '',
    image: data.image ?? [''],
    receiver: data.receiver ?? [''],
    at: data.at ?? [''],
    with: data.with ?? [''],
  }
}
