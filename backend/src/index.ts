import "dotenv/config";

import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./data-source";

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(
      {
        port,
        host: "0.0.0.0",
      },
      () => {
        console.log(`Server is running on http://localhost:${port}`);
      },
    );
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
