import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useDataTransfer from './hooks/data-transfer';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useDataTransfer();

  useEffect(() => {
    const transformedData = (transObj) => {
      const loadedTasks = [];

      for (const taskKey in transObj) {
        loadedTasks.push({ id: taskKey, text: transObj[taskKey].text });
      }

      setTasks(loadedTasks);
    }

    fetchTasks({ url: 'https://custom-hooks-79390-default-rtdb.firebaseio.com/tasks.json' }, transformedData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
