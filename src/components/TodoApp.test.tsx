import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  test('добавляет новую задачу', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/новая задача/i);
    const addButton = screen.getByText(/добавить/i);
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  test('переключает состояние задачи', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/новая задача/i);
    fireEvent.change(input, { target: { value: 'Задача переключения' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('очищает выполненные задачи', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/новая задача/i);
    const addButton = screen.getByText(/добавить/i);
    // Добавляем две задачи
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.click(addButton);

    // Отмечаем первую задачу как выполненную
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Нажимаем кнопку очистки выполненных задач
    const clearButton = screen.getByText(/очистка выполненных/i);
    fireEvent.click(clearButton);
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });
});