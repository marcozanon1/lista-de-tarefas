import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditTask.css'; 

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
    <form className="edit-task-form" onSubmit={handleUpdate}>
      <div className="form-group">
        <label className="form-label">Nome da Tarefa:</label>
        <input
          type="text"
          className="form-input"
          name="name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Tarefa:</label>
        <input
          type="text"
          className="form-input"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn btn-save">Salvar</button>
        <button type="button" className="btn btn-cancel" onClick={() => navigate('/tasks')}>Cancelar</button>
      </div>
    </form>
  );
}

export default EditTask;
