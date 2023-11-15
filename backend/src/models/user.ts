'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
};

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
      User.hasMany(models.Blog)
      User.hasMany(models.Comment)
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
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
