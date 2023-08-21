import { todoArray } from "./sharedTodo.js";

export const addNewTodo = (req, res) => {
  try {
    const newTodo = {
      data: req.body.data,
      id: Math.floor(Math.random() * 1000000), // unique random id
      title: req.body.title,
      description: req.body.description,
      cretedAt: new Date.now(),
    };
    todoArray.push(newTodo);
    res.json(newTodo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
