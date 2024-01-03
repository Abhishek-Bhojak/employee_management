import { Request, Response, Router, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { UserService } from "../services/user.service";
import User from "../entities/interfaces/user.interface";
import {
  UserCreateRequest,
  UserUpdateRequest
} from "../entities/requests/user.request";

const userRouter: Router = Router({ mergeParams: true });
const userService: UserService = new UserService();

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const createRequest: UserCreateRequest = plainToClass(
        UserCreateRequest,
        req.body
      );

      const errors = await validate(createRequest);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const data: User[] = await userService.createUser(createRequest);
      res.status(200).json({ message: "user created successfully" });
    } catch (err) {
      res.json({ error: err });
    }
  }
);
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: User[] = await userService.getUsers();
    res.status(200).json(data);
  } catch (err) {
    res.json({ error: err });
  }
});

userRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: User[] = await userService.getUserById(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      res.json({ error: err });
    }
  }
);
userRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updateRequest: UserUpdateRequest = plainToClass(
        UserUpdateRequest,
        req.body
      );

      const errors = await validate(updateRequest);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
      const data: User[] = await userService.updateUser(updateRequest, id);
      console.log("updated Data", data);
      console.log({ data: data[0] });
      if (data[0]) {
        res.status(200).json({ message: "user updated successfully" });
      } else {
        res.status(400).json({ message: "user not updated" });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  }
);
userRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: any = await userService.deleteUser(req.params.id);
      console.log("deleted Data:", data);
      if (data == 1) {
        res.status(200).json({ message: "user deleted successfully" });
      } else {
        res.status(400).json({ message: "user not deleted" });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  }
);
export default userRouter;
