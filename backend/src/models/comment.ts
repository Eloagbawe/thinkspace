'use strict';
import { Model } from 'sequelize';
import { CommentAttributes } from '../interfaces';

module.exports = (sequelize: any, DataTypes:any ) => {
  class Comment extends Model <CommentAttributes> implements CommentAttributes{
    id!: string;
    content!: string;

    static associate(models: any) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Blog)
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
