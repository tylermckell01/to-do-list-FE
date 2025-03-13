import './styles/App.css';
import { useState, useEffect } from 'react';

function AllTasks(taskName) {

    const [allTasks, setAllTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskStatus, setEditedTaskStatus] = useState("");


    // fetch all tasks function
    const fetchTasks = () => {
        fetch("http://127.0.0.1:5000/tasks")
        .then((response) => {
            if (!response.ok) {
                throw new Error("failed to fetch all tasks")
            }
            return response.json();
        })
        .then((data) => setAllTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }

    // fetch all tasks useeffect
    useEffect(() => {
        fetchTasks()
    }, [taskName]);

    const updateTask = async () => {
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/task/${editingTaskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_name: editedTaskName, 
                    task_status: editedTaskStatus
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to edit task: ${response.status} - ${errorText}`);
            }
    
            const updatedTask = await response.json();
            console.log("Task edited successfully:", updatedTask);
    
            fetchTasks()
    
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };
    


    const handleEditClick = (task) => {
        setEditingTaskId(task.task_id);
        setEditedTaskName(task.task_name);
        setEditedTaskStatus(task.task_status);
    };

    const handleSaveClick = () => {
        updateTask();
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
                        <button onClick={() => handleSaveClick(editingTaskId)}>Save</button>
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
