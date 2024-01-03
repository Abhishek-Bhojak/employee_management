import { LeaveBalanceDao } from "../dao/leave-balance.dao";
import LeaveBalance from "../entities/interfaces/leave-balance.interface";
import { LeaveBalanceCreateRequest } from "../entities/requests/leave-balance.request";
export class LeaveBalanceService {
  private readonly leaveBalanceDao: LeaveBalanceDao;
  constructor() {
    this.leaveBalanceDao = new LeaveBalanceDao();
  }
  async getLeaveBalance(): Promise<LeaveBalance[]> {
    return await this.leaveBalanceDao.getLeaveBalances();
  }
  async createLeaveBalance(
    leaveBalance: LeaveBalanceCreateRequest
  ): Promise<LeaveBalance[]> {
    return await this.leaveBalanceDao.createLeaveBalance(leaveBalance);
  }
  async carryLeave(): Promise<LeaveBalance[]> {
    return await this.leaveBalanceDao.carryLeave()
  }
  async creditLeaveBalance(): Promise<LeaveBalance[]> {
    return await this.leaveBalanceDao.creditLeaveBalance();
  }
}
