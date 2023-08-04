package data

import (
	"backend/internal/biz"
	"backend/internal/conf"
	"backend/module"
	"context"
	"flag"
	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
	"github.com/go-kratos/kratos/v2/log"
	"testing"
	"time"
)

var (
	bc    conf.Bootstrap
	data  *Data
	aRepo biz.InscriptionRepo
)

func init() {
	var flagconf string
	flag.StringVar(&flagconf, "conf", "../../configs", "config path, eg: -conf config.yaml")
	c := config.New(
		config.WithSource(
			file.NewSource(flagconf),
		),
	)

	if err := c.Load(); err != nil {
		log.Fatal(err)
	}

	if err := c.Scan(&bc); err != nil {
		log.Fatal(err)
	}
	var err error
	aRepo, err = newInscriptionRepo()
	if err != nil {
		log.Fatal(err)
	}
}

func newInscriptionRepo() (biz.InscriptionRepo, error) {
	data, _, err := NewData(bc.Data, log.GetLogger(), NewPostgres(bc.Data))
	if err != nil {
		return nil, err
	}

	return NewInscriptionRepo(data, log.GetLogger()), nil
}

func TestInscriptionRepo_InsertProfile(t *testing.T) {
	profile := &module.Profile{
		Address: "0x1335703c944A6d2C132816578e60299F0F33BD88",
		Image:   "ipfs://test",
		Text:    "eth_one",
		Height:  100005,
		TrxHash: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b5",
		TrxTime: time.Now(),
	}

	err := aRepo.InsertProfile(context.Background(), profile)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_UpdateProfile(t *testing.T) {
	profile := &module.Profile{
		Address: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
		Image:   "",
		Text:    "eth_two",
		Height:  20000,
		TrxHash: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b",
		TrxTime: time.Now(),
	}

	err := aRepo.UpdateProfile(context.Background(), profile)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertGroup(t *testing.T) {
	group := &module.Group{
		Address: "0x123456789r4",
		Title:   "eth2",
		Height:  1000001,
		TrxHash: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3q",
		TrxTime: time.Now(),
	}
	err := aRepo.InsertGroup(context.Background(), group)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_DeleteGroupByAddressAndTitle(t *testing.T) {
	group := &module.Group{
		Address: "0x123456789r4",
		Title:   "eth2",
		//Height:  1000001,
		//TrxHash: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3q",
	}
	err := aRepo.DeleteGroupByAddressAndTitle(context.Background(), group)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertMessage(t *testing.T) {
	message := &module.Message{
		Receiver: "bbb",
		Sender:   "aaa",
		Text:     "test9",
		//Image:    []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		//At:       []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		//With:     "0x9d4841ad74987845612",
		Height:   300000,
		TrxHash:  "0x9d4841ad7498784564",
		TrxTime:  time.Now(),
	}

	err := aRepo.InsertMessage(context.Background(), message)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertGroupMessage(t *testing.T) {
	groupMessage := &module.GroupMessage{
		Title:    "group2",
		Sender:   "0x2",
		Text:     "test2",
		//Image:    []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		//At:       []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		With:     "0x1112",
		Height:   3000000,
		TrxHash:  "0x9d4841ad7498784562",
		TrxTime:  time.Now(),
	}
	err := aRepo.InsertGroupMessage(context.Background(), groupMessage)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertTweet(t *testing.T) {
	tweet := &module.Tweet{
		TrxHash: "0x3f13cc8730e56f0e1c78a7f9d9c6094b43780aa5d59e10584dc3eea5c7abc107",
		Sender:  "0x58cb2a37B5c5A0029437baC495C7eb1f326B9754",
		Title:   "",
		Text:    "Base: 34.425728458 Gwei",
		//Image:   []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		At:      nil,
		With:    "0x06936b39399db6d224acdda0f7faff11e7df3c7f3a5c2da08691c0e603508d35",
		Height:  17838678,
		TrxTime: time.Now(),
	}

	err := aRepo.InsertTweet(context.Background(), tweet)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertComment(t *testing.T) {
	comment := &module.Comment{
		With:    "0x8af14ba1df0305e0b57239ab97cc3503a8044358a554db1e2667efba36311f89",
		Sender:  "0x123",
		Text:    "0x1 commnet23",
		Image:   nil,
		At:      []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		Height:  20000,
		TrxHash: "0x9d4841ad7498784563",
		TrxTime: time.Now(),
	}
	err := aRepo.InsertComment(context.Background(), comment)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertLike(t *testing.T) {
	like := &module.Like{
		With:    "0x8af14ba1df0305e0b57239ab97cc3503a8044358a554db1e2667efba36311f89",
		Sender:  "aaae",
		Height:  1000,
		TrxHash: "0x9d4841ad7498784563",
		TrxTime: time.Now(),
	}
	err := aRepo.InsertLike(context.Background(), like)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertFollow(t *testing.T) {
	follow := &module.Follow{
		Address:  "0xC1b634853Cb333D3aD8663715b08f41A3Aec47cc",
		Follower: "0x58cb2a37B5c5A0029437baC495C7eb1f326B9754",
	}
	err := aRepo.InsertFollow(context.Background(), follow)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertMessageWindow(t *testing.T) {
	mw := &module.MessageWindow{
		Owner: "qwe",
		Link:  "ddd",
	}
	err := aRepo.InsertMessageWindow(context.Background(), mw)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_GetMessageWindowByOwner(t *testing.T) {
	owner, err := aRepo.GetMessageWindowByOwner(context.Background(), "qwe")
	if err != nil {
		t.Log(err)
	}
	t.Log(owner)
}

func TestInscriptionRepo_GetLikeByTrxHash(t *testing.T) {
	hash, b, err := aRepo.GetLikeByTrxHash(context.Background(), "0x1111", "aaac")
	t.Log(hash, "\n", b, "\n", err)
}