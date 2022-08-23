import { IUserUpdate } from "../interfaces/user.interface";
import * as yup from "yup";
import { SchemaOf } from "yup";

const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  age: yup.number(),
  email: yup.string().email(),
  name: yup.string(),
  password: yup.string(),
});

export { updateUserSchema };
