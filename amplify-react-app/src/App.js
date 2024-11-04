import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient();

function App({ signOut }) {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({ query: listTodos });
      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newTodo = {
        name: formData.name,
        description: formData.description,
        completed: false
      };
      await client.graphql({
        query: createTodo,
        variables: { input: newTodo }
      });
      setFormData({ name: '', description: '' });
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  async function toggleTodoStatus(todo) {
    try {
      const updatedTodo = {
        id: todo.id,
        completed: !todo.completed
      };
      await client.graphql({
        query: updateTodo,
        variables: { input: updatedTodo }
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async function handleDelete(id) {
    try {
      await client.graphql({
        query: deleteTodo,
        variables: { input: { id } }
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Amplify Todos</h1>
      <button onClick={signOut}>Sign Out</button>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Todo name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">Add Todo</button>
      </form>

      <div style={{ marginTop: 20 }}>
        {todos.map(todo => (
          <div key={todo.id} style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoStatus(todo)}
            />
            <span style={{ marginLeft: 10 }}>{todo.name}</span>
            {todo.description && (
              <p style={{ marginLeft: 30, color: 'gray' }}>{todo.description}</p>
            )}
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
