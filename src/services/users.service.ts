import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces/user.interface";
import { AppError } from "../errors/AppError";

const createUserService = async (user: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create(user);
  await userRepository.save(newUser);

  return newUser;
};

const listAllUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  return users;
};

const listOneUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new AppError("Not Found");
  return user;
};

const updateUserService = async (id: string, newValues: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);
  const updated = await userRepository.update({ id }, newValues);
  if (updated.affected == 0) throw new AppError("User Not Found", 404);
  const updatedUser = await userRepository.findOneBy({ id });
  return updatedUser;
};

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const deleted = await userRepository.delete({ id });
  if (deleted.affected == 0) throw new AppError("User not found", 404);
};

export {
  createUserService,
  listAllUsersService,
  listOneUserService,
  updateUserService,
  deleteUserService,
};
