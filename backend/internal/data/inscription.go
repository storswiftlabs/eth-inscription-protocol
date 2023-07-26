package data

import (
	"backend/module"
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

func (r *inscriptionRepo) InsertProfile(ctx context.Context, profile *module.Profile) error {
	_, err := r.data.postgre.Insert(profile)
	return err
}

func (r *inscriptionRepo) UpdateProfile(ctx context.Context, profile *module.Profile) error {
	_, err := r.data.postgre.Where("address = ?", profile.Address).Update(profile)
	return err
}

func (r *inscriptionRepo) InsertGroup(ctx context.Context, group *module.Group) error {
	_, err := r.data.postgre.Insert(group)
	return err
}

func (r *inscriptionRepo) UpdateGroup(ctx context.Context, group *module.Group) error {
	_, err := r.data.postgre.Where("title = ?", group.Title).Update(group)
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

func (r *inscriptionRepo) InsertLike(ctx context.Context, like *module.Like) error {
	_, err := r.data.postgre.Insert(like)
	return err
}

func (r *inscriptionRepo) InsertFollow(ctx context.Context, follow *module.Follow) error {
	_, err := r.data.postgre.Insert(follow)
	return err
}
