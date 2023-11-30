/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import Sequelize from "sequelize";
import sequelizeConnection from "../config/db";

const User = require('./user')(sequelizeConnection, Sequelize.DataTypes)
const Comment = require('./comment')(sequelizeConnection, Sequelize.DataTypes)
const Blog = require('./blog')(sequelizeConnection, Sequelize.DataTypes)

const db: any = {};

db[User.name] = User
db[Comment.name] = Comment
db[Blog.name] = Blog

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelizeConnection;
db.Sequelize = Sequelize;

export default db;
