const AddTaskForm = ({ input, setInput, onAdd, priority, setPriority }) => (
  <div className="add-task-form">
    <input
      type="text"
      placeholder="Add new item..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <button onClick={onAdd}>Add Task</button>
  </div>
);

export default AddTaskForm;