import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders TaskBoard title', () => {
  render(<App />);
  expect(screen.getByText('TaskBoard')).toBeInTheDocument();
});

test('renders initial tasks', () => {
  render(<App />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build TaskBoard')).toBeInTheDocument();
});

test('can add new task', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Enter task name...');
  const addButton = screen.getByText('Add Task');
  
  fireEvent.change(input, { target: { value: 'New Test Task' } });
  fireEvent.click(addButton);
  
  expect(screen.getByText('New Test Task')).toBeInTheDocument();
});

test('can delete task', () => {
  render(<App />);
  const deleteButtons = screen.getAllByText('×');
  
  fireEvent.click(deleteButtons[0]);
  
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});