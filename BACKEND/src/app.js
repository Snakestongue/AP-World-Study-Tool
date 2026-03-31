// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import userRouter from "./Routes/user.route.js";
// const app = express(); // create express app
// app.use(express.json());

// import userRouter from "./Routes/user.route.js"

// app.use("/api/v1/users", userRouter);
// export default app;

//http://localhost:4000/api/v1/users/register

import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import userRouter from "./Routes/user.route.js";

const app = express();

app.use(express.json());
app.use("/APWST", userRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../FRONTEND");
app.use(express.static(path.join(__dirname, "../../")));

app.use("/FRONTEND", express.static(frontendPath));
app.get('{/*path}', (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

export default app;
