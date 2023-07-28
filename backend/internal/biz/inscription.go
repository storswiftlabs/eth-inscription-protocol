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
	InsertMessage(ctx context.Context, message *module.Message) error
	FindMessageByAddressAndHeight(ctx context.Context, req *module.GetMessageReq) ([]*module.Message, error)
	InsertGroupMessage(ctx context.Context, groupMessage *module.GroupMessage) error
	FindGroupMessageByTitlesAndHeight(ctx context.Context, req *module.GetGroupMessageReq) ([]*module.GroupMessage, error)
	InsertTweet(ctx context.Context, tweet *module.Tweet) error
	InsertComment(ctx context.Context, comment *module.Comment) error
	InsertLike(ctx context.Context, like *module.Like) error
	InsertFollow(ctx context.Context, follow *module.Follow) error
	FindFollowByAddress(ctx context.Context, address string) ([]*module.Follow, error)
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

func (uc *InscriptionUsecase) GetMessageHandle(ctx context.Context, req *module.GetMessageReq) ([]*module.Message, error) {
	return uc.repo.FindMessageByAddressAndHeight(ctx, req)
}

func (uc *InscriptionUsecase) GetGroupMessageHandle(ctx context.Context, req *module.GetGroupMessageReq) ([]*module.GroupMessage, error) {
	return uc.repo.FindGroupMessageByTitlesAndHeight(ctx, req)
}

func (uc *InscriptionUsecase) GetTweetHandle(ctx context.Context, req *module.GetMessageReq) ([]*module.Tweets, error) {

}

func (uc *InscriptionUsecase) GetFollowTweetHandle(ctx context.Context, req *module.GetMessageReq) ([]*module.Tweets, error) {

}

func (uc *InscriptionUsecase) GetTweetByAddressHandler(ctx context.Context, req *module.GetMessageReq) ([]*module.Tweets, error) {

}

func (uc *InscriptionUsecase) GetFollowerHandler(ctx context.Context, address string) ([]*module.Follow, error) {
	byAddress, err := uc.repo.FindFollowByAddress(ctx, address)
}

func (uc *InscriptionUsecase) GetAnyByTrxHashHandler(ctx context.Context, hash string) ([]*module.Swift, error) {

}
