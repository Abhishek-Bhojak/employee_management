const port = 3000;
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "../routes/user.route";
import leaveRouter from "../routes/leave.route";
import leaveBalanceRouter from "../routes/leave-balance.route";
import holidayListRouter from "../routes/holiday-list.route"
import { databaseConnector } from "../config/database.config";
import db from "../models";

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(databaseConnector);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my application");
});
app.use("/user", userRouter);
app.use("/leave", leaveRouter);
app.use("/leave-balance", leaveBalanceRouter);
app.use("/holiday-list",holidayListRouter)  ;
// app.use('/employee',emprouter)
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
