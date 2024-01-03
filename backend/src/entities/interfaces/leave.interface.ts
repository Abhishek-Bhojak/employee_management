import { LeaveApprovalStatus, LeaveType } from "../enums/leave.enum";
interface Leave {
  id: string;
  userId: string;
  nhId: string;
  leaveType: LeaveType;
  startDate: string;
  days: number;
  status: LeaveApprovalStatus;
  isNewRecord: boolean;
  createdAt: string;
  updatedAt: string;
}
export default Leave;
