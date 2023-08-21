import { todoArray } from "./sharedTodo.js";

export const addNewTodo = (req, res) => {
  try {
    const newTodo = {
      data: req.body.data,
      id: Math.floor(Math.random() * 1000000), 
    };
    todoArray.push(newTodo);
    console.log(todoArray);
    res.json(newTodo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
