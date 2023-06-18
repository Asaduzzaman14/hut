import mongoose from "mongoose";
import app from "./app";
// import config from "./config";

import { Server } from "http";
import config from "./config";

process.on("uncaughtException", (error) => {
     console.log(error);
     process.exit(1);
});

let server: Server;

async function main() {
     try {
          await mongoose.connect(config.database_url as string);
          console.log("database connection successfull");

          server = app.listen(config.port, () => {
               console.log(`express app is listining in port ${config.port}`);
          });
     } catch (error) {
          console.log("Failed to connect database", error);
     }

     process.on("unhandledRejection", (error) => {
          // console.log('unhandel Rejection ');

          if (server) {
               server.close(() => {
                    console.log(error);
                    process.exit(1);
               });
          } else {
               process.exit(1);
          }
     });
}

main();

process.on("SIGTERM", () => {
     console.log("SIGTERM is receivde");
     if (server) {
          server.close();
     }
});
