import User from "../entities/interfaces/user.interface";
import {
  UserCreateRequest,
  UserUpdateRequest
} from "../entities/requests/user.request";
import { Model, where } from "sequelize";
import db from "../models";
export class UserDao {
  constructor() {}

  async getUsers(): Promise<User[]> {
    const model: Model[] = await db.UserModel.findAll();
    return model.map((model: Model) => this.convertToEntity(model));
  }
  async getUserById(userId: string): Promise<User[]> {
    const model: Model = await db.UserModel.findOne({
      where: { id: userId },
    });
    console.log("user Data:", model);
    return model.get();
  }
  async updateUser(
    updateRequest:UserUpdateRequest ,
    id: string
  ): Promise<User[]> {
    // console.log("------update request:", updateRequest);
    const data = updateRequest;
    const [affectedRows]: [number]= await db.UserModel.update(data, {
      where: { id: id },
    });

    if(affectedRows > 0){
      const updatedUser:User | null  = await db.UserModel.findOne({
        where: { id: id },
      })
      if(updatedUser){
        return [updatedUser];
      }
    }
    return []
  }
  async deleteUserById(userId: string): Promise<number> {
    console.log(userId);
    const model: number = await db.UserModel.destroy({
      where: {
        id: userId,
      },
    });
    console.log("model deleted data:", model);
    return model;
  }
  async createUser(createRequest: UserCreateRequest): Promise<User[]> {
    console.log("createData", createRequest);
    var data = {
      firstName: createRequest.firstName,
      lastName: createRequest.lastName,
      email: createRequest.email,
      role: createRequest.role,
    };
    const model: Model = await db.UserModel.create(data, {
      logging: console.log,
    });
    console.log(model.get());
    return model.get();
  }
  private convertToEntity(model: Model): User {
    const result = model.get({ plain: true });
    // delete result.errorcode;
    return result;
  }
}
