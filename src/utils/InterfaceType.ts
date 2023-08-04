export enum ItemType {
  create_profile = 'create-profile', // 创建profile
  updare_profile = 'update-profile', // 更新profile
  send_message = 'im', // 发送消息
  create_group = 'create-group', // 创建群聊
  update_group_add = 'update-group-add', // 新增群成员
  update_group_del = 'update-group-del', // 删除群成员
  tweet_send = 'tweet', // 发送推文
  tweet_comment = 'tweet-comment', //   评论推文
  tweet_like = 'tweet-like', //     点赞
  tweet_follow = 'tweet-follow', //      关注用户
  follow_unfollow = 'un-follow', // 取消关注或取消收藏
}

export interface createProfile { // 创建profile
  type: ItemType.create_profile
  image: string // 头像(头像可以为uri，也可以将图片转为16进制)
  text: string // text为昵称
}

export interface updareProfile { // 更新profile
  type: ItemType.updare_profile
  image: string // 头像(头像可以为uri，也可以将图片转为16进制)
  text: string // text为昵称
}

export interface sendMessage { // 发送消息
  type: ItemType.send_message
  text: string // 消息（ 必填 )
  title?: string // 为群名，有的话代表群聊（ 选填 )
  image?: string[] // 为图片（ 选填 )
  with?: string // 参数为trx hash，在这里为  “转发” （ 选填 )
  at?: string[] // @ 为 艾特人物 （ 选填 )
}

export interface createGroup { // 创建群聊
  type: ItemType.create_group
  title: string // 为群名, 然后我们会生成一个随机id（ 必填 )
  receiver: string[] // 为群成员，带上自己， 在2个以上（ 必填 )
  text?: string // 消息（ 选填 )
  image?: string[] // 为图片（ 选填 )
  with?: string // 参数为trx hash，在这里为  “转发” （ 选填 )
  at?: string[] // @ 为 艾特人物 （ 选填 )
}

export interface updateGroupAdd {
  type: ItemType.update_group_add
  title: string // 为群名, 然后我们会生成一个随机id（ 必填 )
  receiver: string[] // 为要加的人（ 必填 )
  text?: string // 消息（ 选填 )
  image?: string[] // 为图片（ 选填 )
  with?: string // 参数为trx hash，在这里为  “转发” （ 选填 )
  at?: string[] // @ 为 艾特人物 （ 选填 )
}

export interface updateGroupDel {
  type: ItemType.update_group_del
  title: string // 为群名, 然后我们会生成一个随机id（ 必填 )
  receiver: string[] // 要删除的人（ 必填 )
  text?: string // 消息（ 选填 )
  image?: string[] // 为图片（ 选填 )
  with?: string // 参数为trx hash，在这里为  “转发” （ 选填 )
  at?: string[] // @ 为 艾特人物 （ 选填 )
}

export interface tweetSend { //  发送推文
  type?: ItemType.tweet_send
  title?: string // 标题
  text: string // 文本
  image?: string[] // 为图片（ 选填 )
  at?: string[] //  @ 为 艾特人物 （ 选填 )
  with?: string //   with参数为trx hash， 引用推文 ，只能引用一个，和推特"引用推文"功能一样（ 选填 )
}

export interface tweetComment { // 评论推文
  type?: ItemType.tweet_comment
  text?: string //   text为评论文本 （ 选填 ) 文本图片二选一
  image?: string[] //   image 为 图片（ 选填 ) 文本图片二选一
  at?: string[] //  @ 为 艾特人物 （ 选填 )
  with: string //     with 参数为 trx hash ，代表评论改trx hash里面的推文 （ 必填 )
}

export interface tweetLike { // 点赞
  type: ItemType.tweet_like
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
