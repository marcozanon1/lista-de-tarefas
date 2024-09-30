import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskItem.css'; // Importa o arquivo CSS

function TaskItem({ task }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${task.id}`); // Substitua pela sua API
      alert('Tarefa excluída');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  const handleMarkAsDone = async () => {
    try {
      await axios.put(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${task.id}`, { ...task, done: true });
      window.location.reload();
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
