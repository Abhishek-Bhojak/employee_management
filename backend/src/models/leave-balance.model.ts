import { Model, Sequelize } from "sequelize";
import LeaveBalance from "../entities/interfaces/leave-balance.interface";
import { LeaveType } from "../entities/enums/leave.enum";
// import userModel from "./user.model"
interface LeaveBalanceInterface
  extends Omit<LeaveBalance, "createdAt" | "updatedAt"> {}
module.exports = (sequelize: any, DataTypes: any) => {
  
  class LeaveBalanceModel
    extends Model<LeaveBalanceInterface>
    implements LeaveBalanceInterface
  {
    userId!: string;
    leaveType!: LeaveType;
    balance!: number;
  }
  LeaveBalanceModel.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        primaryKey: true,
      },
      leaveType: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "leave-balance",
    }
  );
  // LeaveBalanceModel.belongsTo(db.LeaveModel,{
  //   foreignKey: "LeaveType",
  //   onDelete:'CASCADE',
  // })
  // LeaveBalanceModel.belongsTo(userModel,{
  //   foreignKey: "UserId",
  //   onDelete:'CASCADE',
  // })
  return LeaveBalanceModel;
};
