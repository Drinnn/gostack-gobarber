import { Router } from "express";
import appointmentRouter from "./appointment.routes";
import userRouter from "./user.routes";
import sessionRouter from "./session.routes";

const routes = Router();

routes.use("/appointments", appointmentRouter);
routes.use("/users", userRouter);
routes.use("/sessions", sessionRouter);

export default routes;
