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
		Address: "0x01f5BB073e893d334FF9b0e239939982c124AF97",
		Image:   "ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/1309.png",
		Text:    "Wan_cheng",
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
		Address: "0xDE2C8959BBCE26dD27E956B7b5ea9bB2d6eeB591",
		Title:   "Magic Castle",
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
		Address: "0xDE2C8959BBCE26dD27E956B7b5ea9bB2d6eeB591",
		Title:   "Magic Castle",
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
		//Receiver: "0xDE2C8959BBCE26dD27E956B7b5ea9bB2d6eeB591",
		Receiver: "0x50b6d02B9194dDf386A56ae92d251c7e3e0f06ba",
		Sender:   "0xDE2C8959BBCE26dD27E956B7b5ea9bB2d6eeB591",
		Text:     "这是一个有趣的问题。NFT无疑引发了很大的关注，但一些人担心这可能只是一个短暂的热潮。然而，NFT技术本身有着更广阔的应用前景，比如在供应链、鉴定认证等领域都可能发挥作用，所以它的发展方向还有待观察。",
		//Image:    []string{"ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/383.png"},
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
		Title:    "Warm Home",
		Sender:   "0x50b6d02B9194dDf386A56ae92d251c7e3e0f06ba",
		Text:     "Polygon Labs此前向DeLabs提供了300万美元作为从Solana迁移的协议款，DeLabs将进行返还。",
		//Image:    []string{"ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/315.png"},
		//At:       []string{"0x9d4841ad7498784561", "0x9d4841ad7498784562"},
		//With:     "0x1112",
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
		TrxHash: "0x8abf2cfc977f9917d48d9168e910851a6a66abcc77ff13a5a7f9a15dffa90ac1",
		Sender:  "0x50b6d02B9194dDf386A56ae92d251c7e3e0f06ba",
		Title:   "Web3应用的未来",
		Text:    "我听说NFT是Web3的一个重要应用，你能解释一下NFT是什么吗？",
		Image:   []string{"ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/265.png"},
		//At:      []string{"0xaB6B4b11378a57933333e4Acfdc45567Dd78F14E"},
		With:    "0xcda0f3e6652901e0ea8732ff0e14e9086c87cb2a4c61275b48f19119cc6b302a",
		Height:  178386911,
		TrxTime: time.Now(),
	}

	err := aRepo.InsertTweet(context.Background(), tweet)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertComment(t *testing.T) {
	comment := &module.Comment{
		With:    "0x0cd4d5e826a4c881e19b067a890e8597f7a12e5f41a50910215c24d317414c67",
		Sender:  "0x01f5BB073e893d334FF9b0e239939982c124AF97",
		Text:    "还可以继续探讨或者提出更多问题",
		//Image:   []string{"ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/1309.png"},
		//At:      []string{"0xA7308D4D83b14859916671A17370476E6c6Cd1A9", "0x9d4841ad7498784562"},
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
		With:    "0x8abf2cfc977f9917d48d9168e910851a6a66abcc77ff13a5a7f9a15dffa90ac1",
		Sender:  "0x01f5BB073e893d334FF9b0e239939982c124AF97",
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
		Address:  "0x01f5BB073e893d334FF9b0e239939982c124AF97",
		Follower: "0x50b6d02B9194dDf386A56ae92d251c7e3e0f06ba",
	}
	err := aRepo.InsertFollow(context.Background(), follow)
	if err != nil {
		t.Log(err)
	}
}

func TestInscriptionRepo_InsertMessageWindow(t *testing.T) {
	mw := &module.MessageWindow{
		Owner: "0xDE2C8959BBCE26dD27E956B7b5ea9bB2d6eeB591",
		Link:  "0x974CaA59e49682CdA0AD2bbe82983419A2ECC400",
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

func TestInscriptionRepo_DeleteFollow(t *testing.T) {
	err := aRepo.DeleteLike(context.Background(), &module.Like{
		With:   "0x1703601c661deea6720ecdd9b6d3fba5dadfa9d255f08764ae7346a491b2657d",
		Sender: "aaac",
	})
	t.Log(err)
}

func TestInscriptionRepo_DeleteFollow2(t *testing.T) {
	err := aRepo.DeleteFollow(context.Background(), &module.Follow{
		Address:  "0xC1b634853Cb333D3aD8663715b08f41A3Aec47cc",
		Follower: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
	})
	t.Log(err)
}
