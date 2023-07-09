import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useDataTransfer from '../../hooks/data-transfer';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: postData } = useDataTransfer();

  const enterTaskHandler = async (taskText) => {
    const transformData = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    }
    postData({
      url: 'https://custom-hooks-79390-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText }
    }, transformData);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
