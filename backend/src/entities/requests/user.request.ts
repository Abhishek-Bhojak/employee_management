// import "reflect-metadata";
import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
IsOptional,
} from "class-validator";
import UserRole from "../enums/user.enum";

export class UserCreateRequest {
  @IsString({ message: "firstName must be a string" })
  @IsNotEmpty()
  firstName!: string;
  @IsString({ message: "lastName must be a string" })
  @IsNotEmpty({ message: "lastName should not be empty" })
  lastName!: string;
  @IsEmail({}, { message: "invalid email format" })
  @IsNotEmpty({ message: "empty Email" })
  email!: string;
  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}

export class UserUpdateRequest {
  id!: string;
  @IsOptional()
  @IsString({ message: "firstName must be a string" })
  @IsNotEmpty({ message: "firstName should not be empty" })
  firstName!: string;
  @IsOptional()
  @IsString({ message: "lastName must be a string" })
  @IsNotEmpty({ message: "lastName should not be empty" })
  lastName!: string;
  @IsOptional()
  @IsEmail({}, { message: "invalid email format" })
  @IsNotEmpty({ message: "empty Email" })
  email!: string;
  @IsOptional()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}

