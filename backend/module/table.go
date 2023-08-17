package module

import "time"

type Swift struct {
	Id       int64    `json:"id"`
	Type     string   `json:"type"`
	Chain    string   `json:"chain"`
	Title    string   `json:"title"`
	Text     string   `json:"text"`
	Image    []string `json:"image"`
	Receiver []string `json:"receiver"`
	At       []string `json:"at"`
	With     string   `json:"with"`
	Height   int64    `json:"height"`
	TrxHash  string   `json:"trx_hash"`
	TrxTime  int64    `json:"timestamp"`
	Sender   string   `json:"sender"`
	To       string   `json:"to"`
}

type Profile struct {
	Address string `xorm:"pk"`
	Image   string
	Text    string    `xorm:"notnull"`
	Height  int64     `xorm:"notnull"`
	TrxHash string    `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Group struct {
	Id      int64
	Address string    `xorm:"notnull"`
	Title   string    `xorm:"notnull"`
	Height  int64     `xorm:"notnull"`
	TrxHash string    `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type MessageWindow struct {
	Id    int64
	Owner string `xorm:"notnull"`
	Link  string `xorm:"notnull"`
}

type Message struct {
	Id       int64
	Receiver string `xorm:"notnull index"`
	Sender   string `xorm:"notnull"`
	Text     string `xorm:"notnull"`
	Image    []string
	At       []string
	With     string
	Height   int64     `xorm:"notnull"`
	TrxHash  string    `xorm:"notnull"`
	TrxTime  time.Time `xorm:"notnull"`
}

type GroupMessage struct {
	Id       int64
	Title    string `xorm:"notnull index"`
	Receiver []string
	Sender   string `xorm:"notnull"`
	Text     string `xorm:"notnull"`
	Image    []string
	At       []string
	With     string
	Height   int64     `xorm:"notnull"`
	TrxHash  string    `xorm:"notnull"`
	TrxTime  time.Time `xorm:"notnull"`
}

type Tweet struct {
	Id      int64
	TrxHash string `xorm:"notnull"`
	Sender  string `xorm:"notnull index"`
	Title   string
	Text    string `xorm:"notnull"`
	Image   []string
	At      []string
	With    string
	Height  int64     `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Comment struct {
	Id      int64
	With    string `xorm:"notnull"`
	Sender  string `xorm:"notnull index"`
	Text    string `xorm:"notnull"`
	Image   []string
	At      []string
	Height  int64     `xorm:"notnull"`
	TrxHash string    `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Like struct {
	Id      int64
	With    string    `xorm:"notnull"`
	Sender  string    `xorm:"notnull index"`
	Height  int64     `xorm:"notnull"`
	TrxHash string    `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Follow struct {
	Id       int64
	Address  string `xorm:"notnull"`
	Follower string `xorm:"notnull"`
}

type GetMTReq struct {
	Owner   string
	Address string
	Limit   int64
	Offset  int64
}

type GetGroupMessageReq struct {
	Title string
}

type Tweets struct {
	Profile     Profile
	Twt         Tweet
	WithProfile Profile
	With        Tweet
	Comments    []*Comments
	LikeNum     int64
	LikeBool    bool
}

type Comments struct {
	Profile Profile
	Comment Comment
}

type Record struct {
	Owner string `xorm:"pk"`
	Last  int64  `xorm:"notnull"`
}
