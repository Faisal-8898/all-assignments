const express = require("express");
const cors = require("cors");
const routes = require("./routes/route.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

let todos = [];

app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).send();
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server has connected");
});
