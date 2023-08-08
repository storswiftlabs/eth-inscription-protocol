/* eslint unicorn/prefer-node-protocol: 0 */
import process from 'process'

const ApiUrl = process.env.NEXT_PUBLIC_FETCH_API

export async function getChatGeneral() {
  return await fetch(`${ApiUrl}/api/chat`).then(e => e.json())
}
export async function getMessageList(owner: string) {
  return await fetch(`${ApiUrl}/api/message_window?owner=${owner}`).then(e => e.json())
}
export async function getMessageGroupList(owner: string) {
  return await fetch(`${ApiUrl}/api/group?address=${owner}`).then(e => e.json())
}
export async function getMessageGroup(group: string, limit: number, offset: number) {
  return await fetch(`${ApiUrl}/api/group_message?title=${group}&limit=${limit}&offset=${offset}`).then(e => e.json())
}
export async function getMessagePerson(owner: string, to: string) {
  return await fetch(`${ApiUrl}/api/message?owner=${owner}&to=${to}&limit=10&offset=1`).then(e => e.json())
}
export async function getMessageWith(txhash: string, type: string) {
  return await fetch(`${ApiUrl}/api/message/${txhash}?type=${type}`).then(e => e.json())
}
export async function getProfile(owner: string) {
  return await fetch(`${ApiUrl}/api/profile?address=${owner}`).then(e => e.json())
}
