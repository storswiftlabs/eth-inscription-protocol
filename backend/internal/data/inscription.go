package data

import (
	"backend/internal/biz"
	"backend/module"
	"context"
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

func (r *inscriptionRepo) InsertProfile(ctx context.Context, profile *module.Profile) error {
	_, err := r.data.postgre.Insert(profile)
	return err
}

// TODO 创建时候插入N条
func (r *inscriptionRepo) InsertGroup(ctx context.Context, group *module.Group) error {
	_, err := r.data.postgre.Insert(group)
	return err
}

func (r *inscriptionRepo) InsertMessage(ctx context.Context, message *module.Message) error {
	_, err := r.data.postgre.Insert(message)
	return err
}

func (r *inscriptionRepo) InsertGroupMessage(ctx context.Context, groupMessage *module.GroupMessage) error {
	_, err := r.data.postgre.Insert(groupMessage)
	return err
}

func (r *inscriptionRepo) InsertTweet(ctx context.Context, tweet *module.Tweet) error {
	_, err := r.data.postgre.Insert(tweet)
	return err
}

func (r *inscriptionRepo) InsertComment(ctx context.Context, comment *module.Comment) error {
	_, err := r.data.postgre.Insert(comment)
	return err
}

func (r *inscriptionRepo) InsertFollow(ctx context.Context, follow *module.Follow) error {
	_, err := r.data.postgre.Insert(follow)
	return err
}

func (r *inscriptionRepo) InsertLike(ctx context.Context, like *module.Like) error {
	_, err := r.data.postgre.Insert(like)
	return err
}

func (r *inscriptionRepo) InsertChainHeight(ctx context.Context, chain *biz.Chain) error {
	_, err := r.data.postgre.Insert(chain)
	return err
}

func (r *inscriptionRepo) UpdateChainHeight(ctx context.Context, chain *biz.Chain) error {
	_, err := r.data.postgre.Where("name = ?", chain.Name).Update(chain)
	return err
}

func (r *inscriptionRepo) GetChainHeight(ctx context.Context, chain *biz.Chain) (*biz.Chain, error) {
	_, err := r.data.postgre.Get(chain)
	return chain, err
}

func (r *inscriptionRepo) DeleteLike(ctx context.Context, like *module.Like) error  {
	_, err := r.data.postgre.Where("\"with\" = ? AND sender = ?", like.With, like.Sender).Delete(like)
	return err
}

func (r *inscriptionRepo) DeleteFollow(ctx context.Context, follow *module.Follow) error  {
	_, err := r.data.postgre.Where("address = ? AND follower = ?", follow.Address, follow.Follower).Delete(follow)
	return err
}

// TODO 每产生一条message 插入两条记录
func (r *inscriptionRepo) InsertMessageWindow(ctx context.Context, messageWindow *module.MessageWindow) error {
	exist, _ := r.ExistMessageWindow(ctx, messageWindow)
	if exist == true {
		return nil
	}
	_, err := r.data.postgre.Insert(messageWindow)
	return err
}

func (r *inscriptionRepo) ExistMessageWindow(ctx context.Context, messageWindow *module.MessageWindow) (bool, error) {
	exist, err := r.data.postgre.Exist(messageWindow)
	return exist, err
}

func (r *inscriptionRepo) UpdateProfile(ctx context.Context, profile *module.Profile) error {
	_, err := r.data.postgre.Where("address = ?", profile.Address).Update(profile)
	return err
}

func (r *inscriptionRepo) DeleteGroupByAddressAndTitle(ctx context.Context, group *module.Group) error {
	_, err := r.data.postgre.Where("address = ?", group.Address).And("title = ?", group.Title).Delete(group)
	return err
}

func (r *inscriptionRepo) GetMessageWindowByOwner(ctx context.Context, owner string) ([]*module.Profile, error){
	var link []string
	err := r.data.postgre.Table("message_window").Cols("link").Where("owner = ?", owner).Find(&link)
	if err != nil {
		return nil, err
	}
	profiles := make([]*module.Profile, len(link))
	for k, v := range link {
		profile, err := r.GetProfile(ctx, &module.Profile{Address: v})
		if err != nil {
			r.log.Warn(err)
		}
		profiles[k] = profile
	}
	return profiles, nil
}

func (r *inscriptionRepo) GetProfile(ctx context.Context, profile *module.Profile) (*module.Profile, error) {
	_, err := r.data.postgre.Get(profile)
	return profile, err
}

func (r *inscriptionRepo) FindGroupByAddress(ctx context.Context, address string) ([]*module.Group, error) {
	group := make([]*module.Group, 0)
	err := r.data.postgre.Where("address = ?", address).Find(&group)
	return group, err
}

func (r *inscriptionRepo) FindGroupReceiverByTitle(ctx context.Context, title string) ([]string, error) {
	var receiver []string
	err := r.data.postgre.Table("group").Cols("address").Where("title = ?", title).Find(&receiver)
	return receiver, err
}

func (r *inscriptionRepo) FindMessageByAddress(ctx context.Context, req *module.GetMTReq) ([]*module.Message, error) {
	message := make([]*module.Message, 0)
	err := r.data.postgre.Where("receiver = ? AND sender = ?", req.Owner, req.Address).Or("sender = ? AND receiver = ?", req.Owner, req.Address).Limit(int(req.Limit), int(req.Offset)).Find(&message)
	return message, err
}

func (r *inscriptionRepo) GetMessageByTrxHash(ctx context.Context, hash string) (*module.Message, error) {
	message := new(module.Message)
	_, err := r.data.postgre.Where("trx_hash = ?", hash).Get(message)
	return message, err
}

func (r *inscriptionRepo) GetGroupMessageByTrxHash(ctx context.Context, hash string) (*module.GroupMessage, error) {
	message := new(module.GroupMessage)
	_, err := r.data.postgre.Where("trx_hash = ?", hash).Get(message)
	return message, err
}

func (r *inscriptionRepo) FindGroupMessageByTitle(ctx context.Context, req *module.GetMTReq) ([]*module.GroupMessage, error) {
	groupMessage := make([]*module.GroupMessage, 0)
	err := r.data.postgre.Where("title = ?", req.Owner).Limit(int(req.Limit), int(req.Offset)).Find(&groupMessage)
	return groupMessage, err
}

func (r *inscriptionRepo) FindFollowTweet(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error) {
	var follower []*string
	err := r.data.postgre.Table("follow").Cols("follower").Where("address = ?", req.Owner).Find(&follower)
	if err != nil {
		r.log.Warn(err)
	}
	tweet := make([]*module.Tweet, 0)
	err = r.data.postgre.In("sender", follower).Limit(int(req.Limit), int(req.Offset)).Desc("id").Find(&tweet)
	if err != nil {
		r.log.Warn(err)
	}
	tweets := make([]*module.Tweets, len(tweet))
	for k, v := range tweet {
		tmpTweets := new(module.Tweets)
		likeNum, b, err := r.GetLikeByTrxHash(ctx, v.TrxHash, req.Owner)
		if err != nil {
			r.log.Warn(err)
		}

		if v.With != "" {
			withTweet, err := r.GetTweetByTrxHash(ctx, v.With)
			if err != nil {
				r.log.Warn(err)
			}
			withProfile, _ := r.GetProfile(ctx, &module.Profile{Address: withTweet.Sender})
			tmpTweets.With = *withTweet
			tmpTweets.WithProfile = *withProfile
		}
		comments, err := r.FindCommentByTrxHash(ctx, v.TrxHash)
		if err != nil {
			r.log.Warn(err)
		}
		profile, err := r.GetProfile(ctx, &module.Profile{Address: v.Sender})
		if err != nil {
			r.log.Warn(err)
		}
		tmpTweets.Profile = *profile
		tmpTweets.Twt = *v
		tmpTweets.LikeNum = likeNum
		tmpTweets.LikeBool = b
		tmpTweets.Comments = comments
		tweets[k] = tmpTweets
	}

	return tweets, err
}

func (r *inscriptionRepo) FindTweet(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error) {
	tweet := make([]*module.Tweet, 0)
	err := r.data.postgre.Desc("id").Limit(int(req.Limit), int(req.Offset)).Find(&tweet)
	if err != nil {
		return nil, err
	}
	tweets := make([]*module.Tweets, len(tweet))
	for k, v := range tweet {
		tmpTweets := new(module.Tweets)
		likeNum, b, err := r.GetLikeByTrxHash(ctx, v.TrxHash, req.Owner)
		if err != nil {
			r.log.Warn(err)
		}

		if v.With != "" {
			withTweet, err := r.GetTweetByTrxHash(ctx, v.With)
			if err != nil {
				r.log.Warn(err)
			}
			withProfile, _ := r.GetProfile(ctx, &module.Profile{Address: withTweet.Sender})
			tmpTweets.With = *withTweet
			tmpTweets.WithProfile = *withProfile
		}
		comments, err := r.FindCommentByTrxHash(ctx, v.TrxHash)
		if err != nil {
			r.log.Warn(err)
		}
		profile, err := r.GetProfile(ctx, &module.Profile{Address: v.Sender})
		if err != nil {
			r.log.Warn(err)
		}
		tmpTweets.Profile = *profile
		tmpTweets.Twt = *v
		tmpTweets.LikeNum = likeNum
		tmpTweets.LikeBool = b
		tmpTweets.Comments = comments
		tweets[k] = tmpTweets
	}
	return tweets, err
}

func (r *inscriptionRepo) FindTweetByAddress(ctx context.Context, req *module.GetMTReq) ([]*module.Tweets, error) {
	tweet := make([]*module.Tweet, 0)
	err := r.data.postgre.Desc("id").Where("sender = ?", req.Address).Limit(int(req.Limit), int(req.Offset)).Find(&tweet)
	if err != nil {
		return nil, err
	}
	tweets := make([]*module.Tweets, len(tweet))
	for k, v := range tweet {
		tmpTweets := new(module.Tweets)
		likeNum, b, err := r.GetLikeByTrxHash(ctx, v.TrxHash, req.Owner)
		if err != nil {
			r.log.Warn(err)
		}

		if v.With != "" {
			withTweet, err := r.GetTweetByTrxHash(ctx, v.With)
			if err != nil {
				r.log.Warn(err)
			}
			withProfile, _ := r.GetProfile(ctx, &module.Profile{Address: withTweet.Sender})
			tmpTweets.With = *withTweet
			tmpTweets.WithProfile = *withProfile
		}
		comments, err := r.FindCommentByTrxHash(ctx, v.TrxHash)
		if err != nil {
			r.log.Warn(err)
		}
		profile, err := r.GetProfile(ctx, &module.Profile{Address: v.Sender})
		if err != nil {
			r.log.Warn(err)
		}
		tmpTweets.Profile = *profile
		tmpTweets.Twt = *v
		tmpTweets.LikeNum = likeNum
		tmpTweets.LikeBool = b
		tmpTweets.Comments = comments
		tweets[k] = tmpTweets
	}

	return tweets, err
}

func (r *inscriptionRepo) GetTweetByTrxHash(ctx context.Context, hash string) (*module.Tweet, error) {
	tweet := new(module.Tweet)
	has, err := r.data.postgre.Where("trx_hash = ?", hash).Get(tweet)
	if has == false {
		return nil, err
	}
	return tweet, nil
}

func (r *inscriptionRepo) FindCommentByTrxHash(ctx context.Context, hash string) ([]*module.Comments, error) {
	comment := make([]*module.Comment, 0)
	err := r.data.postgre.Where("\"with\" = ?", hash).Find(&comment)
	if err != nil {
		return nil, err
	}

	if len(comment) == 0 {
		return nil, err
	}

	comments := make([]*module.Comments, len(comment))
	for k, v := range comment{
		comments[k] =  new(module.Comments)
		comments[k].Comment = *v
		profile, err := r.GetProfile(ctx, &module.Profile{Address: v.Sender})
		if err != nil {
			r.log.Warn(err)
		}
		comments[k].Profile = *profile
	}
	return comments, err
}

func (r *inscriptionRepo) GetLikeByTrxHash(ctx context.Context, hash string, owner string) (int64, bool, error) {
	likes := new(module.Like)
	count, err := r.data.postgre.Where("\"with\" = ?", hash).Count(likes)
	if err != nil {
		return 0, false, err
	}

	has, err := r.data.postgre.Where("\"with\" = ? AND sender = ?", hash, owner).Exist(new(module.Like))
	if err != nil {
		return 0, false, err
	}
	return count, has, nil
}

func (r *inscriptionRepo) FindFollowerByAddress(ctx context.Context, address string) ([]*module.Profile, error) {
	follow := make([]*module.Follow, 0)
	err := r.data.postgre.Where("address = ?", address).Find(&follow)
	if err != nil {
		return nil, err
	}

	follower := make([]*module.Profile, len(follow))
	for k, v := range follow {
		profile := new(module.Profile)
		_, err := r.data.postgre.Where("address = ?", v.Follower).Get(profile)
		if err != nil {
			return nil, err
		}
		follower[k] = profile
	}
	return follower, nil
}
