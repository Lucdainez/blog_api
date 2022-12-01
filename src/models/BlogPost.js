'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    // modelName: 'blog_post',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return blogPost;
};