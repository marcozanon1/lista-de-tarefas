import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks"); // Substitua pela sua API
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas', error);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tarefas Salvas</h1>
      <button onClick={() => navigate('/')}>Voltar ao Início</button>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
