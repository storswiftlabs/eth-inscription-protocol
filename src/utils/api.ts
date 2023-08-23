/* eslint unicorn/prefer-node-protocol: 0 */
import process from 'process'
import request from './request'
import { FollowTweet, Profile, Tweet } from '@/constant/Global'
import type { ProfileType, TweetType } from '@/constant/Apits'

const ApiUrl = process.env.NEXT_PUBLIC_FETCH_API

async function fetchData(apiUrl: string, queryParams: object) {
  try {
    const queryString = Object.entries(queryParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
    const response = await fetch(`${apiUrl}?${queryString}`)
    if (!response.ok)
      throw new Error('Network response was not ok')
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function getTweet(tweetObj: { owner: string; limit: number; offset: number }): Promise<TweetType> {
  return fetchData(ApiUrl + Tweet, tweetObj)
}

export async function getFollowTweet(FollowtweetObj: { owner: string; limit: number; offset: number }): Promise<TweetType> {
  return fetchData(ApiUrl + FollowTweet, FollowtweetObj)
}

export async function getProfile(address: string): Promise<ProfileType> {
  const res = await request.get(Profile, { params: { address: address.toUpperCase() } })
  return res.data
}

// export async function getGroup({address}:{address:string}): Promise<GroupsType> {
//   return fetchData(ApiUrl + Group, {address});
// }

// export async function getGroup(address: string): Promise<GroupsType> {
//   const res = await request.get(Group, { params: { address: address.toUpperCase() } })
//   return res.data
// }

// export async function getMessageWindow(owner: string): Promise<MessageWinType> {
//   const res = await request.get(MessageWin, { params: { owner } })
//   return res.data
// }

// export async function getMessageAddress(message: { owner: string; to: string; limit: number; offset: number }): Promise<MessageAddressType> {
//   const res = await request.get(MessageWin, { params: message })
//   return res.data
// }

// export async function getGroupMessage(groupObj: { title: string; limit: number; offset: number }): Promise<GroupMessageType> {
//   const res = await request.get(MessageWin, { params: groupObj })
//   return res.data
// }

// export async function getTweet(tweetObj: { owner: string | undefined; limit: number; offset: number }): Promise<TweetType> {
//   const res = await request.get(Tweet, { params: tweetObj })
//   console.log(res,'res');

//   return res.data
// }

// export async function getFollowTweet(FollowtweetObj: { owner: string | undefined; limit: number; offset: number }): Promise<TweetType> {
//   const res = await request.get(FollowTweet, { params: FollowtweetObj })
//   return res.data
// }

// export async function getTweetAddress(address: string, tweetAddressObj: { owner: string; limit: number; offset: number }): Promise<TweetAddressType> {
//   const res = await request.get(`${Tweet}/${address}`, { params: tweetAddressObj })
//   return res.data
// }

// export async function getFollow(address: string): Promise<FollowType> {
//   const res = await request.get(Follow, { params: { address: address.toUpperCase() } })
//   return res.data
// }
