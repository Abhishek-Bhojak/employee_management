import { Model } from "sequelize";
import Leave from "../entities/interfaces/leave.interface";
import {
  PlannedLeaveCreateRequest,
  LeaveUpdateRequest,
  ChangeLeaveStatusRequest,
  NationalLeaveCreateRequest,
} from "../entities/requests/leave.request";
import db from "../models/";
import { LeaveType } from "../entities/enums/leave.enum";
export class LeaveDao {
  constructor() {

    // ---------------check balance before save for the admin approving the request-----------


    db.LeaveModel.addHook("beforeSave",async (updateRequest:Leave,id:any)=>{
      if(updateRequest.isNewRecord==false){
        const {userId,status}=updateRequest;
        if(status=='APPROVED'){
        try{
        const requestId =id.where.id;
      const userData = await db.UserModel.findOne({
        where: {id:userId}
      })
       const {firstName,lastName,Email}=userData 
      const leaveData = await db.LeaveModel.findOne({
        where:{id:requestId}
      })
          const {leaveType,days} = leaveData;
      const leaveBalance = await db.LeaveBalanceModel.findOne({
        where: {
          userId:userId,
          leaveType:leaveType
        }
      })
      const {balance}=leaveBalance;
      if(leaveType==='PLANNED_LEAVE' && (!leaveBalance || balance < days || days<=0)){
        throw new Error(`employee ${firstName} ${lastName} have no sufficient balance for PLANNED_LEAVE`);
         }else if(leaveType==='NATIONAL_LEAVE' && (!leaveBalance || balance < days || days<=0)){
           throw new Error(`employee ${firstName} ${lastName} have no sufficient balance for NATIONAL_LEAVE`);
         }
      }catch(err){
        throw err;
      }
    }else{
      console.log('--------------------Leave Declined--------------------');
    }
    }else{
      console.log('------------------------this method is for create new leave Request--------------');
    }
    })

    // ------------------check balance before employee request for the leave------------------

    db.LeaveModel.addHook('beforeCreate', async (leaveRquest:Leave) => {
      try{
        const user_id=leaveRquest.userId;
        const leave_type=leaveRquest.leaveType;
        if(leave_type==="NATIONAL_LEAVE"){
          const nhId = leaveRquest.nhId;
          const employeeHoliday= await  db.HolidayListModel.findOne({where:{id:nhId}})
          console.log('national holiday data : ',employeeHoliday);
          const {name,date,id}=employeeHoliday
          const Now=new Date(2023,11,1);
          console.log('-------current date : ',Now);

          // verification for same leave apply
          const isPreviouslyApplied=await db.LeaveModel.findOne({
            where:{
              userId:user_id,
              nhId:nhId,
            }
          })
          if(isPreviouslyApplied!=null){
            throw new Error(`you already applied for ${name} holiday`)
            // old holiday request
          }else if(Now.getTime()>date.getTime()){
            throw new Error(`${name} holiday is not available`)
          }
          else{
            const Balance=await db.LeaveBalanceModel.findOne({
              where:{
                userId:user_id,
                leaveType:leave_type,
              }
            })
            const BalanceAmt=Balance.balance
            if(!BalanceAmt || BalanceAmt<=0){
              throw new Error('No balance available for NATIONAL_LEAVE');
            }else{
            }
          }
        }else{
      const {userId,leaveType,days,startDate}=leaveRquest
      const current=new Date()
      const leaveDate=new Date(startDate)
      console.log('-----------leave date: ',leaveDate.getTime());
      console.log('--------------current date: ',current.getTime());
      
      if(leaveDate.getTime()<current.getTime()){
        console.log('-----------leave date: ',leaveDate.getTime());
        console.log('--------------current date: ',current.getTime());
        throw new Error("start date has been expired");
      }
      const leaveBalance = await db.LeaveBalanceModel.findOne({
        where: {
          userId: userId,
          leaveType: leaveType,
        },
      })
      const {balance}=leaveBalance

 
      if(leaveType==='PLANNED_LEAVE' && (!leaveBalance || balance < days || days<=0)){
       throw new Error('No balance available for PLANNED_LEAVE');
        }
      }
     }catch(err){
      throw err;
    }
    })
    db.LeaveModel.addHook("afterUpdate", async (updatedLeave: Leave) => {
      try {
        if (updatedLeave.status=== "APPROVED") {
          const { userId, leaveType, days } = updatedLeave;

          const leaveBalance = await db.LeaveBalanceModel.findOne({
            where: {
              userId: userId,
              leaveType: leaveType,
            },
          });
          if (leaveBalance) {
            if (updatedLeave.leaveType == "PLANNED_LEAVE") {
              // db.LeaveBalanceModel.leaveType = {
              //   PLANNED_LEAVE: leaveBalance.balance -= updatedLeave.days,
              // };

              leaveBalance.balance -= updatedLeave.days;

            } else if (updatedLeave.leaveType == "NATIONAL_LEAVE") {
              // db.LeaveBalanceModel.leaveType = {
              //   NATIONAL_LEAVE: leaveBalance.balance -= updatedLeave.days,
              // }

              leaveBalance.balance -= updatedLeave.days;

              console.log('national_leave Balance : ',leaveBalance.balance);
            }
            await leaveBalance.save();
          }
        }else{
          console.log('the leave status has DECLINED');
        }
      } catch (err) {
        console.log("error in updating the user balance : ", err);
      }
    });
  }
  async changeLeaveStatus(
    changeLeaveStatus: ChangeLeaveStatusRequest,
    id: string
  ): Promise<Leave[]> {
    try{
      const model: any= await db.LeaveModel.update(changeLeaveStatus, {
      // const model: Leave[] = await db.LeaveModel.update(changeLeaveStatus, {
        where: { id: id },
        returning: true,
        individualHooks: true,
      });
      return [model[0]];
    }catch(err:any){
      throw err.message;
    }
  }
  async getLeaves(): Promise<Leave[]> {
    const model: Model[] = await db.LeaveModel.findAll();
    return model.map((model: Model) => this.convertToEntity(model));
  }
  // async getLeave(leaveId:string): Promise<Leave[]>{

  // }
  // async getLaveByUserId(userId: string): Promise<Leave[]>{

  // }
  async updateLeave(
    updateRequest: LeaveUpdateRequest,
    id: string
  ): Promise<Leave[]> {
    const model: any = await db.LeaveModel.update(updateRequest, {
      where: { id: id },
    });
    return [model[0]];
  }
  async deleteLeaveById(leaveId: any): Promise<Leave[]> {
    const model: any = await db.LeaveModel.destroy({
      where: {
        id: leaveId,
      },
    });
    return model;
  }
  async createPlannedLeave(createRequest: PlannedLeaveCreateRequest): Promise<Leave[]> {
    try{
    const model: Model = await db.LeaveModel.create(createRequest);
    return model.get();
  }catch(err:any){
    throw err.message
  }
  }
  async createNationalLeave(createRequest: NationalLeaveCreateRequest): Promise<Leave[]>{
    try{
    const holidayData = await db.HolidayListModel.findOne({
      where:{
        id:createRequest.nhId,
      }
    });
    const {date}=holidayData;
      var data={
        userId: createRequest.userId,
        nhId: createRequest.nhId,
        leaveType: createRequest.leaveType,
        startDate:date,
        days:1
      }
    const model: Model = await db.LeaveModel.create(data)
  return model.get();
  }
    catch(err:any){
      throw err.message
    }
}
  private convertToEntity(model: Model): Leave {
    const result = model.get({ plain: true });
    // delete result.errorcode;
    return result;
  }
}