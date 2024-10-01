import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormPage.css'; // Importa o arquivo CSS

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
      await axios.post('https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks', task); 
      alert('Tarefa salva com sucesso!');
      setTask({ name: '', description: '' });
    } catch (error) {
      console.error('Erro ao salvar tarefa', error);
    }
  };

  return (
    <form className="form-page" onSubmit={handleSave}>
      <div className="form-group">
        <label className="form-label">Nome da Tarefa:</label>
        <input
          type="text"
          className="form-input"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Tarefa:</label>
        <input
          type="text"
          className="form-input"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn btn-save">Salvar</button>
        <button type="button" className="btn btn-cancel" onClick={() => setTask({ name: '', description: '' })}>Cancelar</button>
        <button type="button" className="btn btn-view" onClick={() => navigate('/tasks')}>Ver Tarefas</button>
      </div>
    </form>
  );
}

export default FormPage;
