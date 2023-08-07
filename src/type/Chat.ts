export enum FillColor {
  White = 'white',
  Black = 'black',
  Orange = 'orange',
}

export interface ChatContentMessageType {
  type: string
  title: string
  text: string
  image: string[]
  receiver: string[]
  c_at: string[]
  c_with: string
  sender: string
  with: string
}

export interface ProfileResponse {
  at: string[]
  height: number
  image: string[]
  receiver: string[]
  sender: string
  text: string
  title: string
  trxHash: string
  trxTime: string
  type: string
  with: any
}
