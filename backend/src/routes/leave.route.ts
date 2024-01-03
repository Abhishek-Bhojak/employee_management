import { Request, Response, Router, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { LeaveService } from "../services/leave.service";
import Leave from "../entities/interfaces/leave.interface";
import {
  PlannedLeaveCreateRequest,
  LeaveUpdateRequest,
  ChangeLeaveStatusRequest,
  NationalLeaveCreateRequest,
} from "../entities/requests/leave.request";

const leaveRouter: Router = Router({ mergeParams: true });
const leaveService: LeaveService = new LeaveService();

leaveRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Leave[] = await leaveService.getLeaves();
      res.status(200).json(data);
    } catch (err) {
      res.json({ error: err });
    }
  }
);
leaveRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaveType=req.body.leaveType;
      if(leaveType === "PLANNED_LEAVE") {
      const createRequest: PlannedLeaveCreateRequest = plainToClass(
        PlannedLeaveCreateRequest,
        req.body
      );
      const errors = await validate(createRequest);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
      const data: Leave[] = await leaveService.createPlannedLeave(createRequest);
      res.status(200).json({ message: "Leave created successfully" });
    }else if(leaveType === "NATIONAL_LEAVE") {
      const createRequest:NationalLeaveCreateRequest = plainToClass(NationalLeaveCreateRequest,req.body);
      const errors = await validate(createRequest);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
      const data: Leave[] = await leaveService.createNationalLeave(createRequest);
      res.status(200).json({ message: "Leave created successfully" });
    }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  }
);
leaveRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updateRequest: LeaveUpdateRequest = plainToClass(
        LeaveUpdateRequest,
        req.body
      );
      const errors = await validate(updateRequest);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
      const data: Leave[] = await leaveService.updateLeave(updateRequest, id);
      if (data[0]) {
        res.status(200).json({ message: "leave updated successfully" });
      } else {
        res.status(400).json({ message: "leave not updated" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
);
leaveRouter.put(
  "/change-status/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updateStatusRequest: ChangeLeaveStatusRequest = plainToClass(
        ChangeLeaveStatusRequest,
        req.body
      );
      const errors = await validate(updateStatusRequest);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
      const data: Leave[] = await leaveService.changeLeaveStatus(
        updateStatusRequest,
        id
      );
      if (data[0]) {
        res
          .status(200)
          .json({ message: "Leave status updated successfully", data: data });
      } else {
        res.status(500).json({ message: "failed to update leave status" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
);
leaveRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("delete id:", req.params.id);
    try {
      const leave: any = await leaveService.deleteLeave(req.params.id);
      if (leave == 1) {
        res.status(200).json({ message: "leave deleted successfully" });
      } else {
        res.status(404).json({ message: "leave not deleted" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
);
export default leaveRouter;
