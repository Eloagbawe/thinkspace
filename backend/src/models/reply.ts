/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { ReplyAttributes } from '../interfaces';

module.exports = (sequelize: any, DataTypes:any ) => {
  class Reply extends Model <ReplyAttributes> implements ReplyAttributes{
    id!: string;
    content!: string;

    static associate(models: any) {
      Reply.belongsTo(models.User, {
        onDelete: 'CASCADE'
      })
      Reply.belongsTo(models.Comment, {
        onDelete: 'CASCADE'
      })
    }
  }

  Reply.init({
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
    modelName: 'Reply',
  });
  return Reply;
};
