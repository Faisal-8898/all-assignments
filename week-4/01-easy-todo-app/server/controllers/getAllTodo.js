import { todoArray } from "./sharedTodo.js";

export const getAllTodo = (req, res)=>{
    res.json(todoArray);
}