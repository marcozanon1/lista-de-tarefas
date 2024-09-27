import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  // Carrega a tarefa atual ao montar o componente
  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await axios.get(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${id}`);
        setTask(response.data); // Atualiza o estado com os dados da tarefa recebida
      } catch (error) {
        console.error('Erro ao carregar tarefa', error);
      }
    }
    fetchTask();
  }, [id]);

  // Função de atualização da tarefa
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${id}`, {
        name: task.name,
        description: task.description
      });
      
      if (response.status === 200) {
        alert('Tarefa atualizada com sucesso');
        navigate('/tasks'); // Redireciona para a lista de tarefas
      } else {
        alert('Erro ao atualizar a tarefa');
      }
      
    } catch (error) {
      console.error('Erro ao atualizar tarefa', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label>Nome da Tarefa:</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Tarefa:</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={() => navigate('/tasks')}>Cancelar</button>
    </form>
  );
}

export default EditTask;
