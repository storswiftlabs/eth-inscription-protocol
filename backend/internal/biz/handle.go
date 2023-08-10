package biz

import (
	"backend/module"
	"context"
)

func (uc *InscriptionUsecase) HandleSwift(ctx context.Context, swifts []module.Swift)  {
	for _, v := range swifts {
		switch v.Type {
		case "create-profile":
			if err := uc.SwiftCreateProfileHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle create-profile fail: %v", err)
			}
		case "update-profile":
			if err := uc.SwiftUpdateProfileHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle update-profile fail: %v", err)
			}
		case "im":
			if err := uc.SwiftImHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle im fail: %v", err)
			}
		case "create-group":
			if err := uc.SwiftCreateGroupHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle create-group fail: %v", err)
			}
		case "update-group-add":
			if err := uc.SwiftUpdateGroupAddHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle update-group-add fail: %v", err)
			}
		case "update-group-del":
			if err := uc.SwiftUpdateGroupDelHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle update-group-del: %v", err)
			}
		case "tweet":
			if err := uc.SwiftTweetHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle tweet fail: %v", err)
			}
		case "tweet-comment":
			if err := uc.SwiftTweetCommentHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle tweet-comment fail: %v", err)
			}
		case "tweet-like":
			if err := uc.SwiftTweetLikeHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle tweet-like fail: %v", err)
			}
		case "un-like":
			if err := uc.SwiftTweetUnLikeHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle un-like fail: %v", err)
			}
		case "tweet-follow":
			if err := uc.SwiftTweetFollowHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle tweet-follow fail: %v", err)
			}
		case "un-follow":
			if err := uc.SwiftUnFollowHandle(ctx, v); err != nil{
				uc.log.Fatalf("handle un-follow fail: %v", err)
			}
		}
	}

}

func (uc *InscriptionUsecase) SwiftCreateProfileHandle(ctx context.Context, swift module.Swift) error {
	profile := &module.Profile{
		Address: swift.Sender,
		Image:   swift.Image[0],
		Text:    swift.Text,
		Height:  swift.Height,
		TrxHash: swift.TrxHash,
		TrxTime: swift.TrxTime,
	}
	return uc.repo.InsertProfile(ctx, profile)
}

func (uc *InscriptionUsecase) SwiftUpdateProfileHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftImHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftCreateGroupHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftUpdateGroupAddHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftUpdateGroupDelHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftTweetHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftTweetCommentHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftTweetLikeHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftTweetUnLikeHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftTweetFollowHandle(ctx context.Context, swift module.Swift) error {
	return nil
}

func (uc *InscriptionUsecase) SwiftUnFollowHandle(ctx context.Context, swift module.Swift) error {
	return nil
}