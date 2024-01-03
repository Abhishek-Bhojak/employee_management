import { Request, Response, Router, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { LeaveBalanceService } from "../services/leave-balance.service";
import LeaveBalance from "../entities/interfaces/leave-balance.interface";
import { LeaveBalanceCreateRequest } from "../entities/requests/leave-balance.request";
const leaveBalanceRouter: Router = Router({ mergeParams: true });
const leaveBalanceService: LeaveBalanceService = new LeaveBalanceService();

leaveBalanceRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LeaveBalance[] = await leaveBalanceService.getLeaveBalance();
      res.status(200).json(data);
    } catch (err) {
      res.json({ error: err });
    }
  }
);
leaveBalanceRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createRequest: LeaveBalanceCreateRequest = plainToClass(
        LeaveBalanceCreateRequest,
        req.body
      );
      const errors = await validate(createRequest);
      if (errors.length > 0) {
        res.status(400).json({ error: errors });
        return;
      }
      const data: LeaveBalance[] = await leaveBalanceService.createLeaveBalance(
        createRequest
      );
      res.status(200).json({ message: "leaveBalance created successfully" });
    } catch (err) {
      res.json({ error: err });
    }
  }
);
leaveBalanceRouter.get("/carry-leave", async (req: Request,res:Response,next:NextFunction)=>{
  try{
    const leave: any = await leaveBalanceService.carryLeave()
    res.status(200).json({ message: "carry for the leave has been updated"});
  }catch (err) {
    res.status(404).json({ message: "fail to update carry leave "});
  }
})
leaveBalanceRouter.get('/credit-leave', async (req: Request,res:Response,next:NextFunction)=>{
  try{
    const leave: any = await leaveBalanceService.creditLeaveBalance()
    res.status(200).json({ message: "leave has been credited"});
  }catch (err) {
    res.status(404).json({ message: "fail to credit leave balance"});
  }
})
export default leaveBalanceRouter;
