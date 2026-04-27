import express from "express";
import notificationRoutes from "./api/notification.controller";

const app = express();

app.use(express.json());

app.use("/api", notificationRoutes);

export default app;