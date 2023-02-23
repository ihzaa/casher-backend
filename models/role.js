"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Permission, {
        through: models.RoleHasPermission,
        uniqueKey: "RoleId",
      });
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        uniqueKey: "RoleId",
      });
    }
  }
  Role.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Role",
      timestamps: false,
    }
  );
  return Role;
};
