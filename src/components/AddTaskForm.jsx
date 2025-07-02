const AddTaskForm = ({ input, setInput, onAdd }) => (
  <div className="add-task-form">
    <input
      type="text"
      placeholder="Add new item..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <button onClick={onAdd}>Add Task</button>
  </div>
);

export default AddTaskForm;
