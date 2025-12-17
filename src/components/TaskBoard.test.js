import { render, screen, fireEvent } from '@testing-library/react';
import TaskBoard from './TaskBoard';

const mockTasks = [
  { id: 1, name: 'Test Task 1', status: 'todo' },
  { id: 2, name: 'Test Task 2', status: 'inprogress' },
  { id: 3, name: 'Test Task 3', status: 'done' }
];

const mockProps = {
  tasks: mockTasks,
  onAddTask: jest.fn(),
  onMoveTask: jest.fn(),
  onDeleteTask: jest.fn()
};

test('renders all columns', () => {
  render(<TaskBoard {...mockProps} />);
  expect(screen.getByText('To Do')).toBeInTheDocument();
  expect(screen.getByText('In Progress')).toBeInTheDocument();
  expect(screen.getByText('Done')).toBeInTheDocument();
});

test('renders tasks in correct columns', () => {
  render(<TaskBoard {...mockProps} />);
  expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  expect(screen.getByText('Test Task 3')).toBeInTheDocument();
});

test('calls onAddTask when add button clicked', () => {
  render(<TaskBoard {...mockProps} />);
  const input = screen.getByPlaceholderText('Enter task name...');
  const button = screen.getByText('Add Task');
  
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button);
  
  expect(mockProps.onAddTask).toHaveBeenCalledWith('New Task');
});

test('calls onDeleteTask when delete button clicked', () => {
  render(<TaskBoard {...mockProps} />);
  const deleteButton = screen.getByLabelText('Delete Test Task 1');
  
  fireEvent.click(deleteButton);
  
  expect(mockProps.onDeleteTask).toHaveBeenCalledWith(1);
});

test('handles enter key in input field', () => {
  render(<TaskBoard {...mockProps} />);
  const input = screen.getByPlaceholderText('Enter task name...');
  
  fireEvent.change(input, { target: { value: 'Enter Task' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
  
  expect(mockProps.onAddTask).toHaveBeenCalledWith('Enter Task');
});