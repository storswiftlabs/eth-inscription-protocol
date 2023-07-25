package data

import (
	"context"

	"backend/internal/biz"

	"github.com/go-kratos/kratos/v2/log"
)

type inscriptionRepo struct {
	data *Data
	log  *log.Helper
}

// NewInscriptionRepo .
func NewInscriptionRepo(data *Data, logger log.Logger) biz.InscriptionRepo {
	return &inscriptionRepo{
		data: data,
		log:  log.NewHelper(logger),
	}
}

func (r *inscriptionRepo) Save(ctx context.Context, g *biz.Inscription) (*biz.Inscription, error) {
	return g, nil
}
