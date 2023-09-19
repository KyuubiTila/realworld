module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    following: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'User',
    });
    Profile.hasMany(models.Article, {
      onDelete: 'cascade',
      foreignKey: 'author',
    });
    Profile.hasMany(models.Comment, {
      onDelete: 'cascade',
      foreignKey: 'author',
    });
  };

  return Profile;
};
