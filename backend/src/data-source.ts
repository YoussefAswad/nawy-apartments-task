import { DataSource } from "typeorm";
import { Apartment } from "./entities/Apartment";
import { ApartmentDetails } from "./entities/ApartmentDetails";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Apartment, ApartmentDetails],
  migrations: [],
  subscribers: [],
});

const retryDelay = 5000; // Retry delay in milliseconds

const initializeDataSource = async () => {
  while (true) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
      break; // Exit the loop if initialization is successful
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait before retrying
    }
  }
};

initializeDataSource();
