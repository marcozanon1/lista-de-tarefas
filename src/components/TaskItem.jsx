import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskItem({ task }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${task.id}`); // Substitua pela sua API
      alert('Tarefa excluída');
      window.location.reload()
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  const handleMarkAsDone = async () => {
    try {
      await axios.put(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${task.id}`, { ...task, done: true });
      window.location.reload()
    } catch (error) {
      console.error('Erro ao marcar tarefa', error);
    }
  };

  return (
    <li>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Status: {task.done ? 'Concluída' : 'Pendente'}</p> {/* Exibição do status */}
      <button onClick={() => navigate(`/edit/${task.id}`)}>Editar</button>
      <button onClick={handleMarkAsDone} disabled={task.done}>Marcar como Feita</button> {/* Desabilitar se já estiver concluída */}
      <button onClick={handleDelete}>Excluir</button>
    </li>
  );
}

export default TaskItem;
