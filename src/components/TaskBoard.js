import React, { useState } from 'react';

function TaskBoard({ tasks, onAddTask, onMoveTask, onDeleteTask }) {
  const [newTaskName, setNewTaskName] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  // BUG-001: Missing state update - doesn't call onAddTask
  const handleAddTask = () => {
    if (newTaskName.trim()) {
      console.log('Adding task:', newTaskName.trim());
      setNewTaskName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // BUG-002: Wrong status comparison - uses 'todo' instead of status parameter
  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== 'todo') {
      onMoveTask(draggedTask.id, status);
    }
    setDraggedTask(null);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const TaskCard = ({ task }) => (
    <div 
      className="task-card"
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
    >
      <span>{task.name}</span>
      {/* BUG-003: Delete button missing onClick handler */}
      <button 
        className="delete-btn"
        aria-label={`Delete ${task.name}`}
      >
        ×
      </button>
    </div>
  );

  const Column = ({ title, status, tasks }) => (
    <div 
      className="column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <h3>{title}</h3>
      <div className="task-list">
        {/* BUG-004: Wrong data source - uses global tasks instead of filtered tasks parameter */}
        {getTasksByStatus(status).map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="taskboard">
      <div className="add-task-form">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter task name..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      
      <div className="columns">
        <Column 
          title="To Do" 
          status="todo" 
          tasks={getTasksByStatus('todo')} 
        />
        <Column 
          title="In Progress" 
          status="inprogress" 
          tasks={getTasksByStatus('inprogress')} 
        />
        <Column 
          title="Done" 
          status="done" 
          tasks={getTasksByStatus('done')} 
        />
      </div>
    </div>
  );
}

export default TaskBoard;