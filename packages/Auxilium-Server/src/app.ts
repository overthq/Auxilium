import * as express from "express";
import router from "./router";

const app: express.Application = express();
const port: number = 4000;

app.use("/", router);

app.listen(port, () => `Server started on port ${port}`);
