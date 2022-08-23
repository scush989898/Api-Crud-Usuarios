import {
  createUserService,
  listAllUsersService,
  listOneUserService,
  updateUserService,
  deleteUserService,
} from "../services/users.service";

import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(instanceToPlain(newUser));
};

const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.json(instanceToPlain(users));
};

const listOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await listOneUserService(id);
  return res.json(instanceToPlain(user));
};

const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await updateUserService(id, req.body);
  return res.json({ message: "User updated", user: instanceToPlain(user) });
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserService(id);
  return res.json({ message: "User deleted" });
};

export {
  createUserController,
  listAllUsersController,
  listOneUserController,
  updateUserController,
  deleteUserController,
};
