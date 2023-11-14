'use strict';
import { Model } from 'sequelize';

interface CommentAttributes {
  id: string;
  content: string;
};

module.exports = (sequelize: any, DataTypes:any ) => {
  class Comment extends Model <CommentAttributes> implements CommentAttributes{
    id!: string;
    content!: string;

    static associate(models: any) {
      Comment.belongsTo(models.User)
      Comment.belongsToMany(models.Blog, {
        through: 'BlogComments'
      })
    }
  }
  Comment.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
