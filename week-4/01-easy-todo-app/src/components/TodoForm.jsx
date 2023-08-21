import { useState } from "react";
import { submitForm } from "../services/api";

const TodoForm = () => {
  const [writetodo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(writetodo);
    setTodo('');
  }

  return (
    <>
      <form action="" className="form" onSubmit={handleSubmit}>
        <label htmlFor="todo">
          <input
            placeholder="Enter new todo..."
            type="text"
            value={writetodo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </label>
      </form>
      <button type="submit">Submit</button>
    </>
  );
};

export default TodoForm;
