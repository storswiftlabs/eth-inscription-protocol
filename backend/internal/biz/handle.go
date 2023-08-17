package biz

import (
	"backend/module"
	"context"
	"time"
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
		TrxTime: time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.InsertProfile(ctx, profile)
}

func (uc *InscriptionUsecase) SwiftUpdateProfileHandle(ctx context.Context, swift module.Swift) error {
	profile := &module.Profile{
		Address: swift.Sender,
		Image:   swift.Image[0],
		Text:    swift.Text,
		Height:  swift.Height,
		TrxHash: swift.TrxHash,
		TrxTime: time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.UpdateProfile(ctx, profile)
}

func (uc *InscriptionUsecase) SwiftImHandle(ctx context.Context, swift module.Swift) error {
	if swift.Title != "" {
		return uc.SwiftGroupMessageHandle(ctx, swift)
	}
	return uc.SwiftMessageHandle(ctx, swift)
}

func (uc *InscriptionUsecase) SwiftGroupMessageHandle(ctx context.Context, swift module.Swift) error {
	groupMessage := &module.GroupMessage{
		Title:    swift.Title,
		Receiver: swift.Receiver,
		Sender:   swift.Sender,
		Text:     swift.Text,
		Image:    swift.Image,
		At:       swift.At,
		With:     swift.With,
		Height:   swift.Height,
		TrxHash:  swift.TrxHash,
		TrxTime:  time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.InsertGroupMessage(ctx, groupMessage)
}
func (uc *InscriptionUsecase) SwiftMessageHandle(ctx context.Context, swift module.Swift) error {
	window1 := &module.MessageWindow{
		Owner: swift.Sender,
		Link:  swift.To,
	}

	window2 := &module.MessageWindow{
		Owner: swift.To,
		Link:  swift.Sender,
	}
	_ = uc.repo.InsertMessageWindow(ctx, window1)
	_ = uc.repo.InsertMessageWindow(ctx, window2)

	message := &module.Message{
		Receiver: swift.To,
		Sender:   swift.Sender,
		Text:     swift.Text,
		Image:    swift.Image,
		At:       swift.At,
		With:     swift.With,
		Height:   swift.Height,
		TrxHash:  swift.TrxHash,
		TrxTime:  time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.InsertMessage(ctx, message)
}

func (uc *InscriptionUsecase) SwiftCreateGroupHandle(ctx context.Context, swift module.Swift) error {
	for _, v := range swift.Receiver{
		group := &module.Group{
			Address: v,
			Title:   swift.Title,
			Height:  swift.Height,
			TrxHash: swift.TrxHash,
			TrxTime: time.Unix(swift.TrxTime, 0),
		}
		err := uc.repo.InsertGroup(ctx, group)
		if err != nil {
			return err
		}
	}
	return nil
}

func (uc *InscriptionUsecase) SwiftUpdateGroupAddHandle(ctx context.Context, swift module.Swift) error {
	for _, v := range swift.Receiver{
		group := &module.Group{
			Address: v,
			Title:   swift.Title,
			Height:  swift.Height,
			TrxHash: swift.TrxHash,
			TrxTime: time.Unix(swift.TrxTime, 0),
		}
		err := uc.repo.InsertGroup(ctx, group)
		if err != nil {
			return err
		}
	}
	return nil
}

func (uc *InscriptionUsecase) SwiftUpdateGroupDelHandle(ctx context.Context, swift module.Swift) error {
	for _, v := range swift.Receiver{
		group := &module.Group{
			Address: v,
			Title:   swift.Title,
		}
		err := uc.repo.DeleteGroupByAddressAndTitle(ctx, group)
		if err != nil {
			return err
		}
	}
	return nil
}

func (uc *InscriptionUsecase) SwiftTweetHandle(ctx context.Context, swift module.Swift) error {
	tweet := &module.Tweet{
		TrxHash: swift.TrxHash,
		Sender:  swift.Sender,
		Title:   swift.Title,
		Text:    swift.Text,
		Image:   swift.Image,
		At:      swift.At,
		With:    swift.With,
		Height:  swift.Height,
		TrxTime: time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.InsertTweet(ctx, tweet)
}

func (uc *InscriptionUsecase) SwiftTweetCommentHandle(ctx context.Context, swift module.Swift) error {
	comment := &module.Comment{
		With:    swift.With,
		Sender:  swift.Sender,
		Text:    swift.Text,
		Image:   swift.Image,
		At:      swift.At,
		Height:  swift.Height,
		TrxHash: swift.TrxHash,
		TrxTime: time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.InsertComment(ctx, comment)
}

func (uc *InscriptionUsecase) SwiftTweetLikeHandle(ctx context.Context, swift module.Swift) error {
	like := &module.Like{
		With:    swift.With,
		Sender:  swift.Sender,
		Height:  swift.Height,
		TrxHash: swift.TrxHash,
		TrxTime: time.Unix(swift.TrxTime, 0),
	}
	return uc.repo.InsertLike(ctx, like)
}

func (uc *InscriptionUsecase) SwiftTweetUnLikeHandle(ctx context.Context, swift module.Swift) error {
	like := &module.Like{
		With:    swift.With,
		Sender:  swift.Sender,
	}
	return uc.repo.DeleteLike(ctx, like)
}

func (uc *InscriptionUsecase) SwiftTweetFollowHandle(ctx context.Context, swift module.Swift) error {
	follow := &module.Follow{
		Address:  swift.Sender,
		Follower: swift.With,
	}
	return uc.repo.InsertFollow(ctx, follow)
}

func (uc *InscriptionUsecase) SwiftUnFollowHandle(ctx context.Context, swift module.Swift) error {
	follow := &module.Follow{
		Address:  swift.Sender,
		Follower: swift.With,
	}
	return uc.repo.DeleteFollow(ctx, follow)
}