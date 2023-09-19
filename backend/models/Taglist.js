module.exports = (sequelize, DataTypes) => {
  const Taglist = sequelize.define('Taglist', {
    tagList: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Taglist.associate = (models) => {
    Taglist.hasOne(models.Article, {
      onDelete: 'restrict',
      foreignKey: 'tagList',
    });
  };

  return Taglist;
};
