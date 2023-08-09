export interface FollowType {
  follower: any[]
}
export interface GroupsType {
  groups: any[]
}
export interface MessageWinType {
  profiles: any[]
}
export interface MessageAddressType {
  messages: MessageAddress[]
}

export interface MessageAddress {
  type: string
  title: string
  text: string
  image: string[]
  receiver: string[]
  at: string[]
  with: string
  height: number
  trxHash: string
  trxTime: string
  sender: string
}

export interface GroupMessageType {
  messages: any[]
}

export interface TweetType {
  tweets: WelcomeTweet[]
}

export interface WelcomeTweet {
  profile: Profile
  tweet: Profile
  withProfile: Profile
  with: Profile
  comments: Comment[]
  likeNum: string
  likeBool: boolean
}

export interface Comment {
  profile: Profile
  comment: Profile
}

export interface Profile {
  type: string
  title: string
  text: string
  image: string[]
  receiver: any[]
  at: string[]
  with: string
  height: string
  trxHash: string
  trxTime: string
  sender: string
}

export interface FollowTweetType {
  tweets: any[]
}

export interface TweetAddressType {
  tweets: any[]
}

export interface FollowerType {
  tweets: any[]
}

export interface ProfileType {
  type: string
  title: string
  text: string
  image: string[]
  receiver: any[]
  at: any[]
  with: string
  height: string
  trxHash: string
  trxTime: string
  sender: string
}
