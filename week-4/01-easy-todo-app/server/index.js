import express from "express";
import cors from "cors";
import route from "./routes/route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server has connected");
});
