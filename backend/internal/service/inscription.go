package service

import (
	"backend/internal/biz"
	"context"
	"github.com/go-kratos/kratos/v2/log"

	pb "backend/api/inscription/v1"
)

type InscriptionService struct {
	pb.UnimplementedInscriptionServer
	uc  *biz.InscriptionUsecase
	log *log.Helper
}

// NewInscriptionService new a inscription service.
func NewInscriptionService(uc *biz.InscriptionUsecase, logger log.Logger) *InscriptionService {
	return &InscriptionService{uc: uc, log: log.NewHelper(log.With(logger, "module", "inscription/service"))}
}

func (s *InscriptionService) CreateUser(ctx context.Context, req *pb.CreateUserInfo) (*pb.UserInfoResponse, error) {
	return &pb.UserInfoResponse{}, nil
}
