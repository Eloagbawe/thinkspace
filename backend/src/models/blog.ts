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
      Blog.belongsTo(models.BlogCategory, {
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
    // tags: {
    //   type: DataTypes.STRING,
    // allowNull: false,
    // get() {
    //     return this.getDataValue('tags').split(';')
    // },
    // set(val: string[]) {
    //    this.setDataValue('tags', val.join(';'));
    // },
    // }
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
