import User from "../entities/interfaces/user.interface";
import { UserDao } from "../dao/user.doa";
import {
  UserCreateRequest,
  UserUpdateRequest
} from "../entities/requests/user.request";
export class UserService {
  private readonly userDao: UserDao;
  constructor() {
    this.userDao = new UserDao();
  }
  async getUsers(): Promise<User[]> {
    return await this.userDao.getUsers();
  }
  async getUserById(userId: any): Promise<User[]> {
    return await this.userDao.getUserById(userId);
  }
  async createUser(createRequest: UserCreateRequest): Promise<User[]> {
    return await this.userDao.createUser(createRequest);
  }
  async updateUser(userUpdate: UserUpdateRequest, id: string): Promise<User[]> {
    return await this.userDao.updateUser(userUpdate, id);
  }
  async deleteUser(userId: string): Promise<number> {
    return await this.userDao.deleteUserById(userId);
  }
}
