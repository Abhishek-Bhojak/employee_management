import { Model } from "sequelize";
import Leave from "../entities/interfaces/leave.interface";
import { LeaveApprovalStatus, LeaveType } from "../entities/enums/leave.enum";
// import db from "../models/";
interface LeaveInterface extends Omit<Leave, "createdAt" | "updatedAt" | "isNewRecord"> {}
module.exports = (sequelize: any, DataTypes: any) => {
  class LeaveModel extends Model<LeaveInterface> implements LeaveInterface {
    public id!: string;
    public userId!: string;
    public nhId!: string;
    public leaveType!: LeaveType;
    public startDate!: string;
    public days!: number;
    public status!: LeaveApprovalStatus;
  }
  LeaveModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      nhId:{
        type:DataTypes.UUID,
        allowNull:true,
        references:{
          model:"holiday-list",
          key:"id"
        }
      },
      leaveType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      days: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },
    },
    {
      sequelize,
      tableName: "leaves",
    }
  );
  // LeaveModel.belongsTo(db.UserModel,{
  //   foreignKey: "userId",
  //   onDelete:'CASCADE',    
  // })
  return LeaveModel;
};
