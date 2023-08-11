export enum ItemType {
  create_profile = 'create-profile', // 创建profile
  update_profile = 'update-profile', // 更新profile
  send_message = 'im', // 发送消息
  create_group = 'create-group', // 创建群聊
  update_group_add = 'update-group-add', // 新增群成员
  update_group_del = 'update-group-del', // 删除群成员
  tweet_send = 'tweet', // 发送推文
  tweet_comment = 'tweet-comment', //   评论推文
  tweet_like = 'tweet-like', //     点赞
  tweet_follow = 'tweet-follow', //      关注用户
  un_follow = 'un-follow', // 取消关注或取消收藏
  un_like = 'un-like',
}

interface defaultBasicType {
  text?: string // 消息（ 必填 )
  title?: string // 为群名，有的话代表群聊（ 选填 )
  image?: string[] // 为图片（ 选填 )
  with?: string // 参数为trx hash，在这里为  “转发” （ 选填 )
  at?: string[] // @ 为 艾特人物 （ 选填 )
}

export interface createProfile extends Omit<defaultBasicType, 'title' | 'with' | 'at'> { // 创建profile
  type: ItemType.create_profile
}

export interface updateProfile extends Omit<defaultBasicType, 'title' | 'with' | 'at'> { // 更新profile
  type: ItemType.update_profile
}

export interface sendMessage extends defaultBasicType { // 发送消息
  type: ItemType.send_message
}

export interface createGroup extends defaultBasicType { // 创建群聊
  type: ItemType.create_group
  receiver: string[] // 为群成员，带上自己， 在2个以上（ 必填 )
}

export interface updateGroupAdd extends Omit<defaultBasicType, 'text'> {
  type: ItemType.update_group_add
  receiver: string[] // 为要加的人（ 必填 )
}

export interface updateGroupDel extends Omit<defaultBasicType, 'text'> {
  type: ItemType.update_group_del
  receiver: string[] // 要删除的人（ 必填 )
}

export interface tweetSend extends defaultBasicType { //  发送推文
  type?: ItemType.tweet_send
}

export interface tweetComment extends Omit<defaultBasicType, 'title'> { // 评论推文
  type?: ItemType.tweet_comment
}

export interface tweetLike { // 点赞
  type: ItemType.tweet_like | ItemType.un_like
  with: string //    with 参数为 trx hash ，代表点赞改trx hash里面的推文（ 必填 )
}

export interface tweetFollow {
  type: ItemType.tweet_follow | ItemType.follow_unfollow
  with: string // with 为要关注用户的钱包地址,代表关注该用户
}

export interface SwiftChatResponse {
  type: string
  title: string
  text: string
  image: string[]
  receiver: string[]
  at: string[]
  with: string
  height: number
  trx_hash: string
  trx_time: string
  sender: string
}
