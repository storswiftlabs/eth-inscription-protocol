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
export async function getMessageGroup(group: string) {
  return await fetch(`${ApiUrl}/api/group_message?title=${group}&limit=10&offset=1`).then(e => e.json())
}
export async function getMessagePerson(owner: string, to: string) {
  return await fetch(`${ApiUrl}/api/message?owner=${owner}&to=${to}&limit=10&offset=1`).then(e => e.json())
}
export async function getProfile(owner: string) {
  return await fetch(`${ApiUrl}/api/profile?address=${owner}`).then(e => e.json())
}
