import { todoArray } from "./sharedTodo.js";

export const deleteTodo = (req, res) => {
  const findIndex = todoArray.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );
  if (findIndex == -1) {
    res.status(404).json("not found");
  }
  else {
    todoArray.splice(findIndex,1);
    res.status(201).send();
  }
};
