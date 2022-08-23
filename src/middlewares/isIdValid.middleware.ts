import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const typeUUID = (uuid: string): boolean => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    uuid
  );
};

const isIdValid = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const valid = typeUUID(id);
  if (!valid) throw new AppError("the id has an invalid format", 404);
  next();
};

export default isIdValid;
