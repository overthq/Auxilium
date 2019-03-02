import * as http from "http";
import * as express from "express";
import * as socketIO from "socket.io";
import router from "./router";
import "./config/database";

const app: express.Application = express();
const port: number = 4000;

const server = http.createServer(app);
const io = socketIO.listen(server);

app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
