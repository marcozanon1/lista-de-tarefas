import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormPage() {
  const [task, setTask] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks', task); // Substitua pela sua API
      alert('Tarefa salva com sucesso!');
      setTask({ name: '', description: '' });
    } catch (error) {
      console.error('Erro ao salvar tarefa', error);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div>
        <label>Nome da Tarefa:</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tarefa:</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={() => setTask({ name: '', description: '' })}>Cancelar</button>
      <button type="button" onClick={() => navigate('/tasks')}>Ver Tarefas</button>
    </form>
  );
}

export default FormPage;
