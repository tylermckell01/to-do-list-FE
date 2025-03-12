import './styles/App.css';
import { useState, useEffect } from 'react';

function AllTasks() {

    const dummyTasks = [
        { task_id: 1, task_name: "Buy groceries", task_status: "pending" },
        { task_id: 2, task_name: "Finish project report", task_status: "in progress" },
        { task_id: 3, task_name: "Workout for 1 hour", task_status: "completed" },
        { task_id: 4, task_name: "Call mom", task_status: "pending" },
        { task_id: 5, task_name: "Read 10 pages of a book", task_status: "in progress" }
      ];


    const [allTasks, setAllTasks] = useState(dummyTasks);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskStatus, setEditedTaskStatus] = useState("");


    const handleEditClick = (task) => {
        setEditingTaskId(task.task_id);
        setEditedTaskName(task.task_name);
        setEditedTaskStatus(task.task_status);
    };

    const handleSaveClick = () => {
        setAllTasks(prevTasks =>
            prevTasks.map(task =>
                task.task_id === editingTaskId ? { ...task, task_name: editedTaskName, task_status: editedTaskStatus } : task
            )
        )
        setEditingTaskId(null);
    };



  return (
    <div className="App">
        <h1>Here are all your tasks</h1>
        <ul>
            {allTasks.map(task => (
                <li key={task.task_id}>
                {editingTaskId === task.task_id ? (
                    <>
                        <input
                            type="text"
                            value={editedTaskName}
                            onChange={(e) => setEditedTaskName(e.target.value)}
                        />
                        <select value={editedTaskStatus} onChange={(e) => setEditedTaskStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                    </>
                ) : (
                    <>
                        {task.task_name} - <strong>{task.task_status}</strong>
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                    </>
                )}
            </li>
            ))}
        </ul>
    </div>
  );
}

export default AllTasks;
