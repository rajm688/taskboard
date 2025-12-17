# Bug Report - TaskBoard

## Summary
- **Total Bugs**: 4
- **Project**: Task Board
- **Tech Stack**: React, React Hooks

---

## BUG-001: Event handler missing function call

### Feature Affected
**Feature:** Add Tasks
**Component:** AddTaskForm
**File:** src/components/TaskBoard.js:8

### Description
Add Task button doesn't create new tasks - missing onAddTask call

### How to Reproduce
1. Open the TaskBoard application
2. Type 'New Task' in the input field
3. Click the 'Add Task' button
4. Expected: New task appears in the To Do column
5. Actual: Input field clears but no new task is created

### Bug Details
**Type:** Event handler missing function call

**Original Code:**
```javascript
const handleAddTask = () => {
    if (newTaskName.trim()) {
      onAddTask(newTaskName.trim());
      setNewTaskName('');
    }
  };
```

**Buggy Code:**
```javascript
const handleAddTask = () => {
    if (newTaskName.trim()) {
      console.log('Adding task:', newTaskName.trim());
      setNewTaskName('');
    }
  };
```

### Why This Bug Exists
Common mistake - forgot to call the parent function to actually add the task

### Expected Impact
New tasks don't appear in the To Do column when Add Task button is clicked

---

## BUG-002: Logic error in conditional

### Feature Affected
**Feature:** Move Tasks
**Component:** DragDrop
**File:** src/components/TaskBoard.js:31

### Description
Drag and drop only works from To Do column - hardcoded status comparison

### How to Reproduce
1. Open the TaskBoard application
2. Try to drag 'Build TaskBoard' from In Progress to Done
3. Expected: Task moves to Done column
4. Actual: Task snaps back to In Progress (move is ignored)
5. Try dragging 'Learn React' from To Do to In Progress - this works

### Bug Details
**Type:** Logic error in conditional

**Original Code:**
```javascript
if (draggedTask && draggedTask.status !== status) {
```

**Buggy Code:**
```javascript
if (draggedTask && draggedTask.status !== 'todo') {
```

### Why This Bug Exists
Hardcoded status check instead of using the parameter

### Expected Impact
Tasks can only be moved if they start from To Do column, other moves are ignored

---

## BUG-003: Missing event handler

### Feature Affected
**Feature:** Delete Tasks
**Component:** DeleteButton
**File:** src/components/TaskBoard.js:47

### Description
Delete button (×) doesn't remove tasks - missing onClick handler

### How to Reproduce
1. Open the TaskBoard application
2. Locate any task card (e.g., 'Learn React')
3. Click the red × button on the task card
4. Expected: Task is removed from the board
5. Actual: Nothing happens, task remains visible

### Bug Details
**Type:** Missing event handler

**Original Code:**
```javascript
<button 
        className="delete-btn"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.name}`}
      >
```

**Buggy Code:**
```javascript
<button 
        className="delete-btn"
        aria-label={`Delete ${task.name}`}
      >
```

### Why This Bug Exists
Missing onClick handler to trigger task deletion

### Expected Impact
Clicking the × button on any task does nothing

---

## BUG-004: Wrong data source in render

### Feature Affected
**Feature:** View Tasks
**Component:** Column
**File:** src/components/TaskBoard.js:63

### Description
All tasks appear in every column - using wrong tasks array

### How to Reproduce
1. Open the TaskBoard application
2. Look at the three columns: To Do, In Progress, Done
3. Expected: Each column shows only tasks with matching status
4. Actual: All tasks appear in every column (Learn React, Build TaskBoard, Write Tests all show in each column)

### Bug Details
**Type:** Wrong data source in render

**Original Code:**
```javascript
{tasks.map(task => (
```

**Buggy Code:**
```javascript
{tasks.map(task => (
```

### Why This Bug Exists
Using the tasks prop instead of the filtered tasks parameter passed to Column

### Expected Impact
All tasks show up in every column instead of being filtered by status

---
