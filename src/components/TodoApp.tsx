import React, { useState } from 'react';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');

    // Функция добавления новой задачи
    const addTodo = () => {
        if (inputValue.trim() === '') return;
        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    // Функция переключения состояния задачи
const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Функция очистки выполненных задач
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Разделение задач на группы
  const allTodos = todos;
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Новая задача"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addTodo(); }}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <div>
        <h2>Общий список задач</h2>
        <ul>
          {allTodos.map(todo => (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Невыполненные задачи</h2>
        <ul>
          {activeTodos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Выполненные задачи</h2>
        <ul>
          {completedTodos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Осталось задач: {activeTodos.length}</p>
        <button onClick={clearCompleted}>Очистка выполненных</button>
      </div>
    </div>
  );
};

export default TodoApp;
