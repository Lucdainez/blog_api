'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    // modelName: 'user',
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'user_id',
      as: 'blogPost',
    });
  };
  return user;
};