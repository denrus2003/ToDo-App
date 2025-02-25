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

