import './styles/App.css';
import { useState, useEffect } from 'react';

function App() {

  const [allTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`the name you entered was: ${taskName}`);

    setTaskName("");
  }

  return (
    <div className="App">
      this is the to do list app

      <div className='inputs-wrapper'>
        <form onSubmit={handleSubmit}>

          <label>
            new task name:
            <input 
              type='text' 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <input type='submit' />
        </form>

      </div>
    </div>
  );
}

export default App;
