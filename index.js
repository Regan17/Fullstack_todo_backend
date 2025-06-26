const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const corsOptions = {
  origin: 'http://fullstacktodobackend.s3-website-us-east-1.amazonaws.com'
};
#hello
app.use(cors(corsOptions));
let todos = [];
app.get('/', (req, res) => res.send('🟢 API is running'));

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
