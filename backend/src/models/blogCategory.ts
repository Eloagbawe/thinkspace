/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { BlogCategoryAttributes } from '../interfaces';

module.exports = (sequelize: any, DataTypes: any ) => {
  class BlogCategory extends Model <BlogCategoryAttributes> implements BlogCategoryAttributes{
    id!: string;
    name!: string;

    static associate(models: any) {
      BlogCategory.hasMany(models.Blog, {
        onDelete: 'CASCADE'
      })
    }
  }
  BlogCategory.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'BlogCategory',
  });
  return BlogCategory;
};
