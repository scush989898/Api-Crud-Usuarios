import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest } from "../interfaces/user.interface";
import { AppError } from "../errors/AppError";

const userExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUserRequest = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const userExists = await userRepository.findOneBy({ email: user.email });
  if (userExists) throw new AppError("User Already Exists");
  next();
};

export { userExistsMiddleware };
