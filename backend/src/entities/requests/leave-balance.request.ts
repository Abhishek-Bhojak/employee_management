import { LeaveType } from "../enums/leave.enum";
import { IsNotEmpty, IsString, IsEnum, IsNumber } from "class-validator";
export class LeaveBalanceCreateRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;
  @IsEnum(LeaveType)
  @IsNotEmpty()
  leaveType!: LeaveType;
  @IsNumber()
  @IsNotEmpty()
  balance!: number;
}
export class LeaveBalanceUpdateRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;
  @IsEnum(LeaveType)
  @IsNotEmpty()
  leaveType!: LeaveType;
  @IsNumber()
  @IsNotEmpty()
  balance!: number;
}
