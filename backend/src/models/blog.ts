/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { BlogAttributes } from '../interfaces';

module.exports = (sequelize: any, DataTypes: any ) => {
  class Blog extends Model <BlogAttributes> implements BlogAttributes{
    id!: string;
    title!: string;
    content!: string;

    static associate(models: any) {
      Blog.belongsTo(models.User, {
        onDelete: 'CASCADE'
      })
      Blog.hasMany(models.Comment, {
        onDelete: 'CASCADE'
      })
    }
  }
  Blog.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
