package service

import (
	pb "backend/api/inscription/v1"
	"backend/internal/biz"
	"backend/module"
	"context"
	"github.com/go-kratos/kratos/v2/log"
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

func (s *InscriptionService) GetProfile(ctx context.Context, req *pb.ByAddress) (*pb.SwiftResponse, error) {
	profile, err := s.uc.GetProfileHandle(ctx, req.Address)
	if err != nil {
		s.log.Warn(err)
	}
	return &pb.SwiftResponse{
		Type:     "profile",
		Title:    "",
		Text:     profile.Text,
		Image:    []string{profile.Image},
		Receiver: nil,
		At:       nil,
		With:     "",
		Height:   profile.Height,
		TrxHash:  profile.TrxHash,
		TrxTime:  profile.TrxTime.String(),
		Sender:   "",
	} , nil
}

func (s *InscriptionService) GetGroup(ctx context.Context, req *pb.ByAddress) (*pb.SwiftResponses, error) {
	groups, err := s.uc.GetGroupHandle(ctx, req.Address)
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(groups))
	for k, v := range groups{
		swiftResponses[k] = &pb.SwiftResponse{
			Type:     "group",
			Title:    v.Title,
			Text:     "",
			Image:    nil,
			Receiver: nil,
			At:       nil,
			With:     "",
			Height:   v.Height,
			TrxHash:  v.TrxHash,
			TrxTime:  v.TrxTime.String(),
			Sender:   "",
		}
	}
	return &pb.SwiftResponses{Groups: swiftResponses}, nil
}

func (s *InscriptionService) GetMessage(ctx context.Context, req *pb.GetMessageReq) (*pb.SwiftResponses, error) {
	messages, err := s.uc.GetMessageHandle(ctx, &module.GetMessageReq{
		Address:     req.Address,
		StartHeight: req.StartHeight,
		EndHeight:   req.EndHeight,
	})
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(messages))
	for k, v := range messages{
		swiftResponses[k] = &pb.SwiftResponse{
			Type:     "message",
			Title:    "",
			Text:     v.Text,
			Image:    v.Image,
			Receiver: []string{v.Receiver},
			At:       v.At,
			With:     v.With,
			Height:   v.Height,
			TrxHash:  v.TrxHash,
			TrxTime:  v.TrxTime.String(),
			Sender:   v.Sender,
		}
	}
	return &pb.SwiftResponses{Groups: swiftResponses}, nil
}

func (s *InscriptionService) GetGroupMessage(ctx context.Context, req *pb.GetGroupMessageReq) (*pb.SwiftResponses, error) {
	groupMessages, err := s.uc.GetGroupMessageHandle(ctx, &module.GetGroupMessageReq{
		Title:       req.Title,
		StartHeight: req.StartHeight,
		EndHeight:   req.EndHeight,
	})
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(groupMessages))
	for k, v := range groupMessages{
		swiftResponses[k] = &pb.SwiftResponse{
			Type:     "message",
			Title:    v.Title,
			Text:     v.Text,
			Image:    v.Image,
			Receiver: v.Receiver,
			At:       v.At,
			With:     v.With,
			Height:   v.Height,
			TrxHash:  v.TrxHash,
			TrxTime:  v.TrxTime.String(),
			Sender:   v.Sender,
		}
	}
	return &pb.SwiftResponses{Groups: swiftResponses}, nil
}

func (s *InscriptionService) GetTweet(ctx context.Context, req *pb.GetTweetReq) (*pb.TweetResponse, error) {

}

func (s *InscriptionService) GetFollowTweet(ctx context.Context, req *pb.GetTweetReq) (*pb.TweetResponse, error) {

}

func (s *InscriptionService) GetTweetByAddress(ctx context.Context, req *pb.GetTweetReq) (*pb.TweetResponse, error) {

}

func (s *InscriptionService) GetFollow(ctx context.Context, req *pb.ByAddress) (*pb.SwiftResponses, error) {

}

func (s *InscriptionService) GetAnyByTrxHash(ctx context.Context, req *pb.GetAnyByTrxHashReq) (*pb.SwiftResponse, error) {

}
