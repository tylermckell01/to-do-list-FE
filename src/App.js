import AllTasks from './AllTasks';
import './styles/App.css';
import { useState } from 'react';

function App() {

  const [taskName, setTaskName] = useState("");



  // submit new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`the name you entered was: ${taskName}`);

    try{
      const response = await fetch("http://127.0.0.1:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({task_name: taskName}),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      console.log("Task added:", newTask);

      setTaskName("");
    } catch (error) {
      console.error("Error adding task:", error)
    }
  };

  return (
    <div className="App">
      this is the to do list app
      <div className='inputs-wrapper'>
        <form onSubmit={handleSubmit}>
          <label>
            New Task:
            <input 
              type='text' 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <input type='submit' />
        </form>
      </div>
      <AllTasks/>
    </div>
  );
}

export default App;
