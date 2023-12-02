/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { UserAttributes } from '../interfaces';

module.exports = (sequelize: any, DataTypes:any ) => {
  class User extends Model <UserAttributes> implements UserAttributes{
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    first_name!: string;
    last_name!: string;
    profile_picture_url!: string;

    static associate(models: any) {
      User.hasMany(models.Blog, {
        onDelete: "CASCADE"
      })
      User.hasMany(models.Comment, {
        onDelete: "CASCADE"
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_picture_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
