import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces/user.interface";
import { AppError } from "../errors/AppError";


const createUserService = async (user: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create(user);
  await userRepository.save(newUser);
  const res = await userRepository
    .createQueryBuilder("users")
    .select([
      "users.id",
      "users.name",
      "users.email",
      "users.age",
      "users.updated_at",
      "users.created_at",
    ])
    .where("users.id = :id", { id: newUser.id })
    .getOne();

  return res;
};

const listAllUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  return users;
};

const listOneUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new AppError("Not Found");
  return user;
};

const updateUserService = async (id: string, newValues: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const updated = await userRepository.update({ id }, newValues);
  if (updated.affected == 0) throw new AppError("User Not Found", 404);
  const res = await userRepository
    .createQueryBuilder("users")
    .select([
      "users.id",
      "users.name",
      "users.email",
      "users.age",
      "users.updated_at",
      "users.created_at",
    ])
    .where("users.id = :id", { id: id })
    .getOne();
  return res;
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
