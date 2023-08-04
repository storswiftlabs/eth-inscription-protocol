/* eslint unicorn/prefer-node-protocol: 0 */
import process from 'process'

export async function getChatGeneral() {
  return await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/api/chat`).then(e => e.json())
}

export async function getMessageList() {
  return await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/api/message_window?owner=111`).then(e => e.json())
}
export async function getMessageGroupList() {
  return await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/api/group?address=0x123456789`).then(e => e.json())
}
export async function getMessageGroup() {
  return await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/api/group_message?title=sui&limit=10&offset=1`).then(e => e.json())
}
export async function getMessagePerson() {
  return await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/api/message?owner=1116&to=eth2&limit=10&offset=1`).then(e => e.json())
}
