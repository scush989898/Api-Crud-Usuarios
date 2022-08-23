import app from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const init = async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  app.listen(3000, () => {
    console.log("App is running!");
  });
};
init(); 
