import axios from "axios";

export function submitForm(data) {
    axios.post('http://localhost:3000/todos', { data: data})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
  }