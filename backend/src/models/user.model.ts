import { Model } from "sequelize";
import User from "../entities/interfaces/user.interface";
import UserRole from "../entities/enums/user.enum";

interface UserInterface extends Omit<User, "createdAt" | "updatedAt"> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserModel extends Model<UserInterface> implements UserInterface {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public role!: UserRole;
  }
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        // autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
    }
  );
  return UserModel;
};
