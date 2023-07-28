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

func (r *inscriptionRepo) UpdateProfile(ctx context.Context, profile *module.Profile) error {
	_, err := r.data.postgre.Where("address = ?", profile.Address).Update(profile)
	return err
}

func (r *inscriptionRepo) GetProfile(ctx context.Context, profile *module.Profile) (*module.Profile, error) {
	_, err := r.data.postgre.Get(profile)
	return profile, err
}

func (r *inscriptionRepo) InsertGroup(ctx context.Context, group *module.Group) error {
	_, err := r.data.postgre.Insert(group)
	return err
}

func (r *inscriptionRepo) DeleteGroupByAddressAndTitle(ctx context.Context, group *module.Group) error {
	_, err := r.data.postgre.Where("address = ?", group.Address).And("title = ?", group.Title).Delete(group)
	return err
}

func (r *inscriptionRepo) FindGroupByAddress(ctx context.Context, address string) ([]*module.Group, error) {
	group := make([]*module.Group, 0)
	err := r.data.postgre.Where("address = ?", address).Find(&group)
	return group, err
}

func (r *inscriptionRepo) InsertMessage(ctx context.Context, message *module.Message) error {
	_, err := r.data.postgre.Insert(message)
	return err
}

func (r *inscriptionRepo) FindMessageByAddressAndHeight(ctx context.Context, req *module.GetMessageReq) ([]*module.Message, error) {
	message := make([]*module.Message, 0)
	err := r.data.postgre.Where("receiver = ? AND height >= ? AND height <= ?", req.Address, req.StartHeight, req.EndHeight).Or("sender = ? AND height >= ? AND height <= ?", req.Address, req.StartHeight, req.EndHeight).Find(&message)
	return message, err
}

func (r *inscriptionRepo) InsertGroupMessage(ctx context.Context, groupMessage *module.GroupMessage) error {
	_, err := r.data.postgre.Insert(groupMessage)
	return err
}

func (r *inscriptionRepo) FindGroupMessageByTitlesAndHeight(ctx context.Context, req *module.GetGroupMessageReq) ([]*module.GroupMessage, error) {
	groupMessage := make([]*module.GroupMessage, 0)
	err := r.data.postgre.Where("title = ? AND height >= ? AND height <= ?", req.Title, req.StartHeight, req.EndHeight).Find(&groupMessage)
	return groupMessage, err
}

func (r *inscriptionRepo) InsertTweet(ctx context.Context, tweet *module.Tweet) error {
	_, err := r.data.postgre.Insert(tweet)
	return err
}

func (r *inscriptionRepo) GetFollowTweetByAddressAndHeight(ctx context.Context, req *module.GetMessageReq) ([]*module.Tweets, error) {
	tweets := make([]*module.Tweets, 0)


}

func (r *inscriptionRepo) InsertComment(ctx context.Context, comment *module.Comment) error {
	_, err := r.data.postgre.Insert(comment)
	return err
}

func (r *inscriptionRepo) InsertLike(ctx context.Context, like *module.Like) error {
	_, err := r.data.postgre.Insert(like)
	return err
}

func (r *inscriptionRepo) InsertFollow(ctx context.Context, follow *module.Follow) error {
	_, err := r.data.postgre.Insert(follow)
	return err
}

func (r *inscriptionRepo) FindFollowByAddress(ctx context.Context, address string) ([]*module.Follow, error) {
	follower := make([]*module.Follow, 0)
	err := r.data.postgre.Where("address = ?", address).Find(&follower)
	return follower, err
}
