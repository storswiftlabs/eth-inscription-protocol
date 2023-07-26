package module

import "time"

//type Swift struct {
//	Id       int64
//	Type     string `xorm:"notnull"`
//	Title    string
//	Text     string
//	Image    []string
//	Receiver []string
//	At       []string
//	With     string
//}

type Profile struct {
	Address string `xorm:"pk"`
	Image   string
	Text    string    `xorm:"notnull"`
	Height  int64     `xorm:"notnull"`
	TrxHash string    `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Group struct {
	Title    string    `xorm:"pk"`
	Receiver []string  `xorm:"notnull"`
	Height   int64     `xorm:"notnull"`
	TrxHash  string    `xorm:"notnull"`
	TrxTime  time.Time `xorm:"notnull"`
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
	Title    string   `xorm:"notnull index"`
	Receiver []string `xorm:"notnull"`
	Sender   string   `xorm:"notnull"`
	Text     string   `xorm:"notnull"`
	Image    []string
	At       []string
	With     string
	Height   int64     `xorm:"notnull"`
	TrxHash  string    `xorm:"notnull"`
	TrxTime  time.Time `xorm:"notnull"`
}

type Tweet struct {
	TrxHash string `xorm:"pk"`
	Sender  string `xorm:"notnull index"`
	Title   string `xorm:"notnull"`
	Text    string `xorm:"notnull"`
	Image   []string
	At      []string
	With    string
	Height  int64     `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Comment struct {
	With    string `xorm:"pk"`
	Sender  string `xorm:"notnull index"`
	Text    string `xorm:"notnull"`
	Image   []string
	At      []string
	Height  int64     `xorm:"notnull"`
	TrxHash string    `xorm:"notnull"`
	TrxTime time.Time `xorm:"notnull"`
}

type Like struct {
	With    string    `xorm:"pk"`
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
