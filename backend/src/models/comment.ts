/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { CommentAttributes } from '../interfaces';

module.exports = (sequelize: any, DataTypes:any ) => {
  class Comment extends Model <CommentAttributes> implements CommentAttributes{
    id!: string;
    content!: string;

    static associate(models: any) {
      Comment.belongsTo(models.User, {
        onDelete: 'CASCADE'
      })
      Comment.belongsTo(models.Blog, {
        onDelete: 'CASCADE'
      })
    }
  }
  Comment.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
