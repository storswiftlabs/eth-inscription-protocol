import request from './request'
import { Follow, FollowTweet, Group, MessageWin, Profile, Tweet } from '@/constant/Global'
import type { FollowType, GroupMessageType, GroupsType, MessageAddressType, MessageWinType, ProfileType, TweetAddressType, TweetType } from '@/constant/Apits'

export async function getGroup(address: string): Promise<GroupsType> {
  const res = await request.get(Group, { params: { address: address.toUpperCase() } })
  return res.data
}

export async function getMessageWindow(owner: string): Promise<MessageWinType> {
  const res = await request.get(MessageWin, { params: { owner } })
  return res.data
}

export async function getMessageAddress(message: { owner: string; to: string; limit: number; offset: number }): Promise<MessageAddressType> {
  const res = await request.get(MessageWin, { params: message })
  return res.data
}

export async function getGroupMessage(groupObj: { title: string; limit: number; offset: number }): Promise<GroupMessageType> {
  const res = await request.get(MessageWin, { params: groupObj })
  return res.data
}

export async function getTweet(tweetObj: { owner: string | undefined; limit: number; offset: number }): Promise<TweetType> {
  const res = await request.get(Tweet, { params: tweetObj })
  return res.data
}

export async function getFollowTweet(FollowtweetObj: { owner: string | undefined; limit: number; offset: number }): Promise<TweetType> {
  const res = await request.get(FollowTweet, { params: FollowtweetObj })
  return res.data
}

export async function getTweetAddress(address: string, tweetAddressObj: { owner: string; limit: number; offset: number }): Promise<TweetAddressType> {
  const res = await request.get(`${Tweet}/${address}`, { params: tweetAddressObj })
  return res.data
}

export async function getFollow(address: string): Promise<FollowType> {
  const res = await request.get(Follow, { params: { address: address.toUpperCase() } })
  return res.data
}

export async function getProfile(address: string): Promise<ProfileType> {
  const res = await request.get(Profile, { params: { address: address.toUpperCase() } })
  return res.data
}
