import * as express from "express";
import router from "./router";
import "./config/database";

const app: express.Application = express();
const port: number = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
