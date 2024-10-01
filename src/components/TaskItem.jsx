import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskItem.css'; 

function TaskItem({ task, onTaskUpdate, onTaskDelete }) { // Recebe as funções via props
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${task.id}`); 
      alert('Tarefa excluída');
      onTaskDelete(task.id); // Chama a função para remover a tarefa do estado
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  const handleMarkAsDone = async () => {
    try {
      await axios.put(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${task.id}`, { ...task, done: true });
      onTaskUpdate({ ...task, done: true }); // Atualiza o estado da tarefa
    } catch (error) {
      console.error('Erro ao marcar tarefa', error);
    }
  };

  return (
    <li className="task-item">
      <h3 className="task-title">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-status">Status: {task.done ? 'Concluída' : 'Pendente'}</p>
      <div className="task-buttons">
        <button className="btn btn-edit" onClick={() => navigate(`/edit/${task.id}`)}>Editar</button>
        <button className="btn btn-done" onClick={handleMarkAsDone} disabled={task.done}>Marcar como Feita</button>
        <button className="btn btn-delete" onClick={handleDelete}>Excluir</button>
      </div>
    </li>
  );
}

export default TaskItem;
