import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { hash } from "bcryptjs";

const validationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      if (user.password) {
        const hashedPassword = await hash(user.password, 10);
        user.password = hashedPassword;
      }
      const validated = await schema.validate(user,{
        abortEarly:false,
        stripUnknown:true
    });
      req.body = validated;
      next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.errors?.join(", "),
      });
    }
  };

export { validationMiddleware };
