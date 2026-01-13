import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/todos`);
            if (!response.ok) throw new Error('Failed to fetch todos');
            const data = await response.json();
            setTodos(data);
            setError('');
        } catch (err) {
            setError('Error connecting to server. Please ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const response = await fetch(`${API_URL}/api/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTodo }),
            });
            if (!response.ok) throw new Error('Failed to add todo');
            const data = await response.json();
            setTodos([data, ...todos]);
            setNewTodo('');
            setError('');
        } catch (err) {
            setError('Failed to add todo');
            console.error(err);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/todos/${id}`, {
                method: 'PUT',
            });
            if (!response.ok) throw new Error('Failed to update todo');
            const updatedTodo = await response.json();
            setTodos(todos.map(t => t._id === id ? updatedTodo : t));
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete todo');
            setTodos(todos.filter(t => t._id !== id));
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    const completedCount = todos.filter(t => t.completed).length;

    return (
        <div className="app-container">
            <div className="todo-card">
                <h1>📝 Todo App</h1>
                <p className="subtitle">MERN Stack Application</p>

                {error && <div className="error-message">{error}</div>}

                <form className="todo-form" onSubmit={addTodo}>
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="Add a new todo..."
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="submit" className="add-button">Add</button>
                </form>

                <div className="stats">
                    {todos.length} total • {completedCount} completed
                </div>

                {loading ? (
                    <div className="loading">Loading todos...</div>
                ) : todos.length === 0 ? (
                    <div className="empty-state">No todos yet. Add one above! 🎉</div>
                ) : (
                    <ul className="todo-list">
                        {todos.map((todo) => (
                            <li key={todo._id} className="todo-item">
                                <input
                                    type="checkbox"
                                    className="todo-checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo._id)}
                                />
                                <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                                    {todo.title}
                                </span>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteTodo(todo._id)}
                                    title="Delete todo"
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
