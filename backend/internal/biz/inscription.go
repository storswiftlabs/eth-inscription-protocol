package biz

import (
	"backend/module"
	"context"
	"github.com/go-kratos/kratos/v2/log"
)

type Inscription struct {
	Hello string
}

// TODO 添加数据库记录高度功能

// InscriptionRepo is a Inscription repo.
type InscriptionRepo interface {
	InsertProfile(ctx context.Context, profile *module.Profile) error
	UpdateProfile(ctx context.Context, profile *module.Profile) error
	GetProfile(ctx context.Context, profile *module.Profile) (*module.Profile, error)
	InsertGroup(ctx context.Context, group *module.Group) error
	DeleteGroupByAddressAndTitle(ctx context.Context, group *module.Group) error
	FindGroupByAddress(ctx context.Context, address string) ([]*module.Group, error)
	FindGroupReceiverByTitle(ctx context.Context, title string) ([]string, error)
	InsertMessage(ctx context.Context, message *module.Message) error
	GetMessageByTrxHash(ctx context.Context, hash string) (*module.Message, error)
	GetGroupMessageByTrxHash(ctx context.Context, hash string) (*module.GroupMessage, error)
	FindMessageByAddress(ctx context.Context, req *module.GetMTReq) ([]*module.Message, error)
	InsertGroupMessage(ctx context.Context, groupMessage *module.GroupMessage) error
	FindGroupMessageByTitle(ctx context.Context, req *module.GetMTReq) ([]*module.GroupMessage, error)
	InsertTweet(ctx context.Context, tweet *module.Tweet) error
	InsertComment(ctx context.Context, comment *module.Comment) error
	InsertLike(ctx context.Context, like *module.Like) error
	InsertFollow(ctx context.Context, follow *module.Follow) error
	FindFollowerByAddress(ctx context.Context, address string) ([]*module.Profile, error)
	FindFollowTweet(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error)
	FindTweet(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error)
	FindTweetByAddress(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error)
	GetTweetByTrxHash(ctx context.Context, hash string) (*module.Tweet, error)
	FindCommentByTrxHash(ctx context.Context, hash string) ([]*module.Comment, error)
	GetLikeByTrxHash(ctx context.Context, hash string, owner string) (int64, bool, error)
	InsertMessageWindow(ctx context.Context, messageWindow *module.MessageWindow) error
	ExistMessageWindow(ctx context.Context, messageWindow *module.MessageWindow) (bool, error)
	GetMessageWindowByOwner(ctx context.Context, owner string) ([]*module.Profile, error)
	DeleteFollow(ctx context.Context, follow *module.Follow) error
	DeleteLike(ctx context.Context, like *module.Like) error
}

// InscriptionUsecase is a inscription usecase.
type InscriptionUsecase struct {
	repo InscriptionRepo
	log  *log.Helper
}

// NewInscriptionUsecase new a Inscription usecase.
func NewInscriptionUsecase(repo InscriptionRepo, logger log.Logger) *InscriptionUsecase {
	return &InscriptionUsecase{repo: repo, log: log.NewHelper(logger)}
}

func (uc *InscriptionUsecase) GetProfileHandle(ctx context.Context, address string) (*module.Profile, error) {
	profile := new(module.Profile)
	profile.Address = address
	return uc.repo.GetProfile(ctx, profile)
}

func (uc *InscriptionUsecase) GetGroupHandle(ctx context.Context, address string) ([]*module.Group, error) {
	return uc.repo.FindGroupByAddress(ctx, address)
}

func (uc *InscriptionUsecase) GetGroupReceiverHandle(ctx context.Context, title string) ([]string, error) {
	return uc.repo.FindGroupReceiverByTitle(ctx, title)
}

func (uc *InscriptionUsecase) GetMessageWindowHandle(ctx context.Context, owner string) ([]*module.Profile, error) {
	return uc.repo.GetMessageWindowByOwner(ctx, owner)
}

func (uc *InscriptionUsecase) GetMessageHandle(ctx context.Context, req *module.GetMTReq) ([]*module.Message, error) {
	return uc.repo.FindMessageByAddress(ctx, req)
}

func (uc *InscriptionUsecase) GetMessageByHashHandle(ctx context.Context, hash string) (*module.Message, error) {
	return uc.repo.GetMessageByTrxHash(ctx, hash)
}

func (uc *InscriptionUsecase) GetGroupMessageByHashHandle(ctx context.Context, hash string) (*module.GroupMessage, error) {
	return uc.repo.GetGroupMessageByTrxHash(ctx, hash)
}

func (uc *InscriptionUsecase) GetGroupMessageHandle(ctx context.Context, req *module.GetMTReq) ([]*module.GroupMessage, error) {
	return uc.repo.FindGroupMessageByTitle(ctx, req)
}

func (uc *InscriptionUsecase) GetTweetHandle(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error) {
	return uc.repo.FindTweet(ctx, req)
}

func (uc *InscriptionUsecase) GetFollowTweetHandle(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error) {
	return uc.repo.FindFollowTweet(ctx, req)
}

func (uc *InscriptionUsecase) GetTweetByAddressHandler(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error) {
	return uc.repo.FindTweetByAddress(ctx, req)
}

func (uc *InscriptionUsecase) GetFollowerHandler(ctx context.Context, address string) ([]*module.Profile, error) {
	return uc.repo.FindFollowerByAddress(ctx, address)
}
