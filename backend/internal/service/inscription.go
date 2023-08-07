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
	}, nil
}

func (s *InscriptionService) GetGroup(ctx context.Context, req *pb.ByAddress) (*pb.SwiftResponses, error) {
	groups, err := s.uc.GetGroupHandle(ctx, req.Address)
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(groups))
	for k, v := range groups {
		receiver, err := s.uc.GetGroupReceiverHandle(ctx, v.Title)
		if err != nil {
			s.log.Warn(err)
		}
		swiftResponses[k] = &pb.SwiftResponse{
			Type:     "group",
			Title:    v.Title,
			Text:     "",
			Image:    nil,
			Receiver: receiver,
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

func (s *InscriptionService) GetMessageWindow(ctx context.Context, req *pb.GetMessageWindowReq) (*pb.MessageWindow, error) {
	profiles, err := s.uc.GetMessageWindowHandle(ctx, req.Owner)
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(profiles))
	for k, v := range profiles {
		swiftResponses[k] = &pb.SwiftResponse{
			Type:     "profile",
			Title:    "",
			Text:     v.Text,
			Image:    []string{v.Image},
			Receiver: nil,
			At:       nil,
			With:     "",
			Height:   v.Height,
			TrxHash:  v.TrxHash,
			TrxTime:  v.TrxTime.String(),
			Sender:   v.Address,
		}
	}
	return &pb.MessageWindow{Profiles: swiftResponses}, nil
}

func (s *InscriptionService) GetMessage(ctx context.Context, req *pb.GetMessageReq) (*pb.GetMessageResponse, error) {
	messages, err := s.uc.GetMessageHandle(ctx, &module.GetMTReq{
		Owner:   req.Owner,
		Address: req.To,
		Limit:   req.Limit,
		Offset:  req.Offset,
	})
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(messages))
	for k, v := range messages {
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
	return &pb.GetMessageResponse{Messages: swiftResponses}, nil
}

func (s *InscriptionService) GetMessageByHash(ctx context.Context, req *pb.GetMessageByHashReq) (*pb.SwiftResponse, error) {
	switch req.Type {
	case "message":
		message, err := s.uc.GetMessageByHashHandle(ctx, req.Hash)
		if err != nil {
			s.log.Warn(err)
		}
		return messageChangeSwiftResponse(message), nil
	case "group_message":
		groupMessage, err := s.uc.GetGroupMessageByHashHandle(ctx, req.Hash)
		if err != nil {
			s.log.Warn(err)
		}
		return groupMessageChangeSwiftResponse(groupMessage), nil
	}
	return nil, nil
}

func (s *InscriptionService) GetGroupMessage(ctx context.Context, req *pb.GetGroupMessageReq) (*pb.GetMessageResponse, error) {
	groupMessages, err := s.uc.GetGroupMessageHandle(ctx, &module.GetMTReq{
		Owner:   req.Title,
		Address: "",
		Limit:   req.Limit,
		Offset:  req.Offset,
	})
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(groupMessages))
	for k, v := range groupMessages {
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
	return &pb.GetMessageResponse{Messages: swiftResponses}, nil
}

func (s *InscriptionService) GetTweet(ctx context.Context, req *pb.GetTweetReq) (*pb.TweetResponse, error) {
	tweets, err := s.uc.GetTweetHandle(ctx, &module.GetMTReq{
		Owner:   req.Owner,
		Address: "",
		Limit:   req.Limit,
		Offset:  req.Offset,
	})
	if err != nil {
		s.log.Warn(err)
	}
	tweetResponse := make([]*pb.Tweets, len(tweets))
	for k, v := range tweets {
		tweetResponse[k] = &pb.Tweets{
			Profile:  profileChangeSwiftResponse(v.Profile),
			Tweet:    tweetChangeSwiftResponse(v.Twt),
			WithProfile: profileChangeSwiftResponse(v.WithProfile),
			With:     tweetChangeSwiftResponse(v.With),
			LikeNum:  v.LikeNum,
			LikeBool: v.LikeBool,
		}
		comments := make([]*pb.Comment, len(v.Comments))
		for k, v := range v.Comments {
			comments[k] = new(pb.Comment)
			comments[k].Profile = profileChangeSwiftResponse(v.Profile)
			comments[k].Comment = commentChangeSwiftResponse(v.Comment)
		}
		tweetResponse[k].Comments = comments
	}

	return &pb.TweetResponse{Tweets: tweetResponse}, err
}

func (s *InscriptionService) GetFollowTweet(ctx context.Context, req *pb.GetFollowTweetReq) (*pb.TweetResponse, error) {
	tweets, err := s.uc.GetFollowTweetHandle(ctx, &module.GetMTReq{
		Owner:   req.Owner,
		Address: "",
		Limit:   req.Limit,
		Offset:  req.Offset,
	})
	if err != nil {
		s.log.Warn(err)
	}

	tweetResponse := make([]*pb.Tweets, len(tweets))
	for k, v := range tweets {
		tweetResponse[k] = &pb.Tweets{
			Profile:  profileChangeSwiftResponse(v.Profile),
			Tweet:    tweetChangeSwiftResponse(v.Twt),
			WithProfile: profileChangeSwiftResponse(v.WithProfile),
			With:     tweetChangeSwiftResponse(v.With),
			LikeNum:  v.LikeNum,
			LikeBool: v.LikeBool,
		}
		comments := make([]*pb.Comment, len(v.Comments))
		for k, v := range v.Comments {
			comments[k] = new(pb.Comment)
			comments[k].Profile = profileChangeSwiftResponse(v.Profile)
			comments[k].Comment = commentChangeSwiftResponse(v.Comment)
		}
		tweetResponse[k].Comments = comments
	}

	return &pb.TweetResponse{Tweets: tweetResponse}, err
}

func (s *InscriptionService) GetTweetByAddress(ctx context.Context, req *pb.GetTweetByAddressReq) (*pb.TweetResponse, error) {
	tweets, err := s.uc.GetTweetByAddressHandler(ctx, &module.GetMTReq{
		Owner:   req.Owner,
		Address: req.Address,
		Limit:   req.Limit,
		Offset:  req.Offset,
	})

	tweetResponse := make([]*pb.Tweets, len(tweets))
	for k, v := range tweets {
		tweetResponse[k] = &pb.Tweets{
			Profile:  profileChangeSwiftResponse(v.Profile),
			Tweet:    tweetChangeSwiftResponse(v.Twt),
			WithProfile: profileChangeSwiftResponse(v.WithProfile),
			With:     tweetChangeSwiftResponse(v.With),
			LikeNum:  v.LikeNum,
			LikeBool: v.LikeBool,
		}
		comments := make([]*pb.Comment, len(v.Comments))
		for k, v := range v.Comments {
			comments[k] = new(pb.Comment)
			comments[k].Profile = profileChangeSwiftResponse(v.Profile)
			comments[k].Comment = commentChangeSwiftResponse(v.Comment)
		}
		tweetResponse[k].Comments = comments
	}

	return &pb.TweetResponse{Tweets: tweetResponse}, err
}

func (s *InscriptionService) GetFollower(ctx context.Context, req *pb.ByAddress) (*pb.GetFollowerResponse, error) {
	profiles, err := s.uc.GetFollowerHandler(ctx, req.Address)
	if err != nil {
		s.log.Warn(err)
	}
	swiftResponses := make([]*pb.SwiftResponse, len(profiles))
	for k, v := range profiles {
		swiftResponses[k] = &pb.SwiftResponse{
			Type:     "follow",
			Title:    "",
			Text:     v.Text,
			Image:    []string{v.Image},
			Receiver: nil,
			At:       nil,
			With:     v.Address,
			Height:   v.Height,
			TrxHash:  v.TrxHash,
			TrxTime:  v.TrxTime.String(),
			Sender:   "",
		}
	}
	return &pb.GetFollowerResponse{Follower: swiftResponses}, nil
}

func tweetChangeSwiftResponse(tweet module.Tweet) *pb.SwiftResponse {
	return &pb.SwiftResponse{
		Type:     "tweet",
		Title:    tweet.Title,
		Text:     tweet.Text,
		Image:    tweet.Image,
		Receiver: nil,
		At:       tweet.At,
		With:     tweet.With,
		Height:   tweet.Height,
		TrxHash:  tweet.TrxHash,
		TrxTime:  tweet.TrxTime.String(),
		Sender:   tweet.Sender,
	}
}

func commentChangeSwiftResponse(comment module.Comment) *pb.SwiftResponse {
	return &pb.SwiftResponse{
		Type:     "comment",
		Title:    "",
		Text:     comment.Text,
		Image:    comment.Image,
		Receiver: nil,
		At:       comment.At,
		With:     comment.With,
		Height:   comment.Height,
		TrxHash:  comment.TrxHash,
		TrxTime:  comment.TrxTime.String(),
		Sender:   comment.Sender,
	}
}

func messageChangeSwiftResponse(message *module.Message) *pb.SwiftResponse {
	return &pb.SwiftResponse{
		Type:     "message",
		Title:    "",
		Text:     message.Text,
		Image:    message.Image,
		Receiver: []string{message.Receiver},
		At:       message.At,
		With:     message.With,
		Height:   message.Height,
		TrxHash:  message.TrxHash,
		TrxTime:  message.TrxTime.String(),
		Sender:   message.Sender,
	}
}

func groupMessageChangeSwiftResponse(message *module.GroupMessage) *pb.SwiftResponse {
	return &pb.SwiftResponse{
		Type:     "group_message",
		Title:    message.Title,
		Text:     message.Text,
		Image:    message.Image,
		Receiver: message.Receiver,
		At:       message.At,
		With:     message.With,
		Height:   message.Height,
		TrxHash:  message.TrxHash,
		TrxTime:  message.TrxTime.String(),
		Sender:   message.Sender,
	}
}

func profileChangeSwiftResponse(profile module.Profile) *pb.SwiftResponse {
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
		Sender:   profile.Address,
	}
}
