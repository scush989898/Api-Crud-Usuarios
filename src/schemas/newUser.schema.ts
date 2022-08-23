import { IUserRequest } from "../interfaces/user.interface";
import * as yup from "yup";
import { SchemaOf } from "yup";

const newUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  age: yup.number().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

export { newUserSchema };
