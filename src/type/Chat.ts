export enum FillColor {
  White = 'white',
  Black = 'black',
}

export interface ChatContentMessageType {
  type: string
  title: string
  text: string
  image: string[]
  receiver: string[]
  c_at: string[]
  c_with: string
}
