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
		Address: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3",
		Image:   "",
		Text:    "sui",
		Height:  10000,
		TrxHash: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b",
		TrxTime: time.Now(),
	}

	err := aRepo.InsertProfile(context.Background(), profile)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_UpdateProfile(t *testing.T) {
	profile := &module.Profile{
		Address: "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3",
		Image:   "",
		Text:    "aptos",
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
		Title:    "sui1",
		Receiver: []string{"0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3", "aa"},
		Height:   100000,
		TrxHash:  "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3",
		TrxTime:  time.Now(),
	}
	err := aRepo.InsertGroup(context.Background(), group)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_UpdateGroup(t *testing.T) {
	group := &module.Group{
		Title:    "sui",
		Receiver: []string{"0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3", "bb"},
		Height:   200000,
		TrxHash:  "0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3",
		TrxTime:  time.Now(),
	}
	err := aRepo.UpdateGroup(context.Background(), group)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertMessage(t *testing.T) {
	message := &module.Message{
		Receiver: "0x9d4841ad7498784561",
		Sender:   "0x9d4841ad74987845624",
		Text:     "this is inscription",
		Image:    []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		At:       []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		With:     "0x9d4841ad74987845612",
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
		Title:    "sui",
		Receiver: []string{"0x9d4841ad749878456c9d6ebeb3e57a5bee0e9dc7f4e4cc184a4b6ba90aa4005b3", "bb"},
		Sender:   "0x9d4841ad7498784561",
		Text:     "this is scipt",
		Image:    []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		At:       []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		With:     "0x9d4841ad7498784562",
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
		TrxHash: "0x9d4841ad749878456132",
		Sender:  "0x9d4841ad7498784562",
		Title:   "sui",
		Text:    "this is inscription",
		Image:   []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		At:      nil,
		With:    "0x9d4841ad7498784563",
		Height:  200000,
		TrxTime: time.Now(),
	}

	err := aRepo.InsertTweet(context.Background(), tweet)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertComment(t *testing.T) {
	comment := &module.Comment{
		With:    "0x9d4841ad74987845612",
		Sender:  "0x9d4841ad7498784562",
		Text:    "this is inscription",
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
		With:    "0x9d4841ad74987845612",
		Sender:  "0x9d4841ad7498784562",
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
		Address:  "0x9d4841ad74987845613",
		Follower: "0x9d4841ad7498784562",
	}
	err := aRepo.InsertFollow(context.Background(), follow)
	if err != nil {
		t.Log(err)
	}
}
