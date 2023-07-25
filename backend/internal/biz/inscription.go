package biz

import (
	"context"

	"github.com/go-kratos/kratos/v2/log"
)


type Inscription struct {
	Hello string
}

// InscriptionRepo is a Inscription repo.
type InscriptionRepo interface {
	Save(context.Context, *Inscription) (*Inscription, error)
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
func (uc *InscriptionUsecase) CreateGreeter(ctx context.Context, g *Inscription) (*Inscription, error) {
	uc.log.WithContext(ctx).Infof("CreateGreeter: %v", g.Hello)
	return uc.repo.Save(ctx, g)
}
