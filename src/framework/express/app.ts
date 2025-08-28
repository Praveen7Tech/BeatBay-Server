import express, { urlencoded } from "express";
import cors from "cors";
import { UserRoutes } from "../routes/user/userRoute.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(
  cors({
    origin: "http://localhost:5173",
    //credentials: true,
  })
);

// Route
const userRoutes = new UserRoutes()
app.use("/user",userRoutes.router)


export default app;