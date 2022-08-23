import {
  createUserService,
  listAllUsersService,
  listOneUserService,
  updateUserService,
  deleteUserService,
} from "../services/users.service";

import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.json(users);
};

const listOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await listOneUserService(id);
  return res.json(user);
};

const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await updateUserService(id, req.body);
  return res.json({message:'User updated',user});
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
