import Leave from "../entities/interfaces/leave.interface";
import { LeaveDao } from "../dao/leave.dao";
import {
  PlannedLeaveCreateRequest,
  LeaveUpdateRequest,
  ChangeLeaveStatusRequest,
  NationalLeaveCreateRequest,
} from "../entities/requests/leave.request";
export class LeaveService {
  private readonly leaveDao: LeaveDao;
  constructor() {
    this.leaveDao = new LeaveDao();
  }
  async getLeaves(): Promise<Leave[]> {
    return await this.leaveDao.getLeaves();
  }
  async updateLeave(
    leaveUpdate: LeaveUpdateRequest,
    id: string
  ): Promise<Leave[]> {
    return await this.leaveDao.updateLeave(leaveUpdate, id);
  }
  async createPlannedLeave(leaveCreate: PlannedLeaveCreateRequest): Promise<Leave[]> {
    return await this.leaveDao.createPlannedLeave(leaveCreate);
  }
  async createNationalLeave(leaveCreate: NationalLeaveCreateRequest):Promise<Leave[]> {
    return await this.leaveDao.createNationalLeave(leaveCreate);
  }
  async deleteLeave(leave: any): Promise<Leave[]> {
    return await this.leaveDao.deleteLeaveById(leave);
  }
  async changeLeaveStatus(
    changeLeaveStatus: ChangeLeaveStatusRequest,
    id: string
  ): Promise<Leave[]> {
    return await this.leaveDao.changeLeaveStatus(changeLeaveStatus, id);
  }
}
