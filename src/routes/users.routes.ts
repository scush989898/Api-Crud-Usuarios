import {
  createUserController,
  listAllUsersController,
  listOneUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller";

import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { newUserSchema } from "../schemas/newUser.schema";
import { updateUserSchema } from "../schemas/update.schema";
import { userExistsMiddleware } from "../middlewares/userExists.middleware";
import isIdValid from "../middlewares/isIdValid.middleware";

const usersRoutes = Router();

usersRoutes.post(
  "",
  validationMiddleware(newUserSchema),
  userExistsMiddleware,
  createUserController
);

usersRoutes.get("", listAllUsersController);

usersRoutes.get("/:id", isIdValid, listOneUserController);

usersRoutes.patch(
  "/:id",
  isIdValid,
  validationMiddleware(updateUserSchema),
  updateUserController
);

usersRoutes.delete("/:id", isIdValid, deleteUserController);

export default usersRoutes;
