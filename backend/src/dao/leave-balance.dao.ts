import { Model,Op } from "sequelize";
import LeaveBalance from "../entities/interfaces/leave-balance.interface";
import {
  LeaveBalanceCreateRequest,
  LeaveBalanceUpdateRequest,
} from "../entities/requests/leave-balance.request";
import db from "../models";
import { LeaveType } from "../entities/enums/leave.enum";
export class LeaveBalanceDao {
  constructor() {
  }
  async getLeaveBalances(): Promise<LeaveBalance[]> {
    const models: Model[] = await db.LeaveBalanceModel.findAll();
    return models.map((model: Model) => this.convertToEntity(model));
  }
  async createLeaveBalance(
    leaveBalance: LeaveBalanceCreateRequest
  ): Promise<LeaveBalance[]> {
    const model: Model = await db.LeaveBalanceModel.create(leaveBalance, {
      logging: console.log,
    });
    return model.get();
  }
  async carryLeave(): Promise<LeaveBalance[]> {
    try{
      const date=new Date();
      if(date.toLocaleDateString() === "27/12/2023"){
      console.log('.......in if .....');
        const userWithExceedPlanLeave=await db.LeaveBalanceModel.findAll({
          where:{
            leaveType:LeaveType.PLANNED_LEAVE,
            balance:{[Op.gt]:12}
          }
        })
        const updatedLeaveBalance = userWithExceedPlanLeave.map(async (leaveBalance:Model & LeaveBalance)=>{
          leaveBalance.balance=Math.min(leaveBalance.balance,12)
          return leaveBalance.save()
        })
        await Promise.all(updatedLeaveBalance)
        await db.LeaveBalanceModel.update({balance:0},{
          where:{leaveType:LeaveType.NATIONAL_LEAVE}
        })
      }else{
        console.log('fail for getting current date');
      }
      return [];
    }catch(err:any) {
      throw err.message
    }
  }
  async creditLeaveBalance(): Promise<LeaveBalance[]> {
    try{
      const date = new Date();
      if(date.toLocaleDateString() === "1/12/2023"){
        await db.LeaveBalanceModel.update({balance:10},{
          where:{leaveType:LeaveType.NATIONAL_LEAVE}
        })
      }else{
        throw new Error('fail for getting current date');
      }
      return [];
    }catch(err:any){
      throw err.message
    }
  }
  private convertToEntity(model: Model): LeaveBalance {
    const result = model.get({ plain: true });
    // delete result.errorcode;
    return result;
  }
}
