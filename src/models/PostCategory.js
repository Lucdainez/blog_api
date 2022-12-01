'use strict';

module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    // modelName: 'posts_category',
  });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: postCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    })
  };

  return postCategory;
};