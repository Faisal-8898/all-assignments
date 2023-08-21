import express from 'express';
import { addNewTodo } from '../controllers/addNewTodo.js';
import { getAllTodo } from '../controllers/getAllTodo.js';
import { deleteTodo } from '../controllers/deleteTodo.js';

const route = express.Router();

route.post('/todos',addNewTodo);
route.get('/todos', getAllTodo);
route.delete('/todos', deleteTodo);

export default route;