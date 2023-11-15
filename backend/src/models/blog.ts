'use strict';
import { Model } from 'sequelize';

interface BlogAttributes {
  id: string;
  title: string;
  content: string;
};

module.exports = (sequelize: any, DataTypes:any ) => {
  class Blog extends Model <BlogAttributes> implements BlogAttributes{
    id!: string;
    title!: string;
    content!: string;

    static associate(models: any) {
      Blog.belongsTo(models.User)
      Blog.hasMany(models.Comment)
    }
  }
  Blog.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
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
