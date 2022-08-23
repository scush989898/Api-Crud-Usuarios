interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
}


interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}

export { IUserRequest, IUserUpdate };

