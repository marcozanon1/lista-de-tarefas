import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import './TasksPage.css'; // Importa o arquivo CSS

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas', error);
      }
    }
    fetchTasks();
  }, []);

  // Função para atualizar o estado quando uma tarefa é marcada como feita
  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Função para remover uma tarefa do estado após exclusão
  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="tasks-page">
      <h1 className="tasks-title">Tarefas Salvas</h1>
      <button className="btn btn-back" onClick={() => navigate('/')}>Voltar ao Início</button>
      <ul className="tasks-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onTaskUpdate={handleTaskUpdate} // Passa a função de atualização
            onTaskDelete={handleTaskDelete} // Passa a função de exclusão
          />
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
