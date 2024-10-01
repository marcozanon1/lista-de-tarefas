import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormPage.css'; // Importa o arquivo CSS

function FormPage() {
  const [task, setTask] = useState({ name: '', description: '' });
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas', error);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks', task);
      setTasks([...tasks, response.data]); // Adiciona a nova tarefa à lista
      alert('Tarefa salva com sucesso!');
      setTask({ name: '', description: '' });
    } catch (error) {
      console.error('Erro ao salvar tarefa', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id)); // Remove a tarefa da lista
      alert('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  const handleToggleDone = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      try {
        const updatedTask = { ...taskToUpdate, done: !taskToUpdate.done };
        await axios.put(`https://66f73cf1b5d85f31a3424e7c.mockapi.io/api/tasks/${id}`, updatedTask);
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task))); // Atualiza a lista de tarefas
      } catch (error) {
        console.error('Erro ao atualizar tarefa', error);
      }
    }
  };

  return (
    <div>
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

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task.name} {task.done && '(Feita)'}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleToggleDone(task.id)}>
              {task.done ? 'Marcar como Não Feita' : 'Marcar como Feita'}
            </button>
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPage;
