package biz

import (
	"backend/module"
	"context"

	"github.com/go-kratos/kratos/v2/log"
)

type Inscription struct {
	Hello string
}

// InscriptionRepo is a Inscription repo.
type InscriptionRepo interface {
	InsertProfile(ctx context.Context, profile *module.Profile) error
	UpdateProfile(ctx context.Context, profile *module.Profile) error
	InsertGroup(ctx context.Context, group *module.Group) error
	UpdateGroup(ctx context.Context, group *module.Group) error
	InsertMessage(ctx context.Context, message *module.Message) error
	InsertGroupMessage(ctx context.Context, groupMessage *module.GroupMessage) error
	InsertTweet(ctx context.Context, tweet *module.Tweet) error
	InsertComment(ctx context.Context, comment *module.Comment) error
	InsertLike(ctx context.Context, like *module.Like) error
	InsertFollow(ctx context.Context, follow *module.Follow) error
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

// CreateGreeter creates a Greeter, and returns the new Greeter.
//func (uc *InscriptionUsecase) CreateGreeter(ctx context.Context, g *Inscription) (*Inscription, error) {
//	uc.log.WithContext(ctx).Infof("CreateGreeter: %v", g.Hello)
//	return uc.repo.Save(ctx, g)
//}
