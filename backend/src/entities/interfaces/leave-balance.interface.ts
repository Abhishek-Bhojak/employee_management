import { LeaveType } from "../enums/leave.enum";
interface LeaveBalance {
  userId: string;
  leaveType: LeaveType;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
export default LeaveBalance;
