'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Dog.associate = function(models) {
    // associations can be defined here
    // ceci est un test
  };
  return Dog;
};
