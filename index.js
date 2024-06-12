import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import PenjualanRoute from "./routes/PenjualanRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

try {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: {
        secure: "auto",
      },
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: "https://renwa-frontend.vercel.app/",
    //   origin: "http://192.168.100.83/:3000",
    })
  );

  app.use(express.json());
  app.use(UserRoute);
  app.use(PenjualanRoute);
  app.use(AuthRoute);

  // store.sync();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });

  (async () => {
    try {
      await db.authenticate();
      console.log("Database connected...");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();
  
} catch (error) {
  console.error("Error initializing the server:", error);
}
