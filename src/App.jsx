import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false, completedAt: null }]);
    setTodo('');
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    newTodos[index].completedAt = newTodos[index].isCompleted
      ? new Date().toLocaleString()
      : null;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <>
      <Navbar toggleTasks={toggleTasks} />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 rounded-xl bg-pink-300 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">TODO - Manage your list</h1>
        <div className="addTodo">
          <h2 className="text-2xl font-bold p-2">Add Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-purple-400 mx-2 rounded-full hover:bg-purple-600 disabled:bg-purple-900 p-4 py-2 text-sm font-bold text-white">
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your TODO-List </h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? 'line-through' : ''}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-purple-400 hover:bg-purple-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-purple-400 hover:bg-purple-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>

      {/* Tasks Modal */}
      {showTasks && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-[90%] md:w-[50%]">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md mb-4"
              onClick={toggleTasks}
            >
              Close
            </button>
            {todos.map((task) => (
              <div key={task.id} className="border-b py-2">
                <p>
                  <strong>Task:</strong> {task.todo}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {task.isCompleted ? 'Completed' : 'Pending'}
                </p>
                {task.completedAt && (
                  <p>
                    <strong>Completed At:</strong> {task.completedAt}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </>
  );
}

export default App;


