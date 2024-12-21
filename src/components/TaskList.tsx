import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, toggleTodo, deleteTodo } from '../features/todos/todosSlice';
import { FaPlus, FaRegCircle, FaCheckCircle, FaTrash } from 'react-icons/fa';

const TodosList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [deleted, setDeleted] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setDeleted(id);
    setTimeout(() => {
      dispatch(deleteTodo(id));
      setDeleted(null);
    }, 600);
  };

  return (
    <div className="bg-neutral-100 rounded-md w-full max-w-md mx-auto shadow-lg p-4 pb-0">
      <div className="flex justify-between items-center bg-primary text-neutral-50 p-4 rounded-t-md">
        <h1 className="text-2xl font-extrabold">To-Do List</h1>
        <button
          className="bg-neutral-50 text-primary px-3 py-2 rounded-3xl font-semibold hover:bg-neutral-100 focus:outline-none"
          onClick={handleAddTodo}
        >
          <div className="flex items-center gap-1">
            <FaPlus />
            <p className="font-semibold">New</p>
          </div>
        </button>
      </div>
      <input
        type="text"
        className="w-full p-2 border-primary border-2 rounded-b-md focus:outline-none bg-neutral-50 text-neutral-900 font-light text-sm shadow-md focus-within:shadow-lg"
        placeholder="Add a new to do..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
      />

      <div className="space-y-4 pt-4 h-96 overflow-y-auto overflow-x-hidden">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center justify-between p-6 mx-4 rounded-md shadow-md ${
              deleted === todo.id ? 'throw-away-animation' : ''
            } ${todo.completed ? 'bg-neutral-100' : 'bg-neutral-50'}`}
          >
            <div className="flex items-center gap-4 truncate">
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <svg className="absolute w-full h-full">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    className="fill-none stroke-neutral-500 stroke-1"
                  ></circle>
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    className="fill-none stroke-primary stroke-2"
                    strokeDasharray="125.6"
                    strokeDashoffset={`${125.6 - (125.6 * todo.progress) / 100}`}
                    style={{
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 1s ease',
                    }}
                  ></circle>
                </svg>
                <input
                  className="absolute w-2/3 h-2/3 cursor-pointer text-neutral-100 bg-primary rounded-full text-center font-semibold focus:outline-none"
                  value={todo.progress}
                  onChange={(e) => {
                    if (isNaN(parseInt(e.target.value))) {
                      e.target.value = '0';
                    }
                    if (parseInt(e.target.value) > 100) {
                      e.target.value = '100';
                    }

                    dispatch(
                      toggleTodo({
                        id: todo.id,
                        progress: parseInt(e.target.value),
                      }),
                    );
                  }}
                ></input>
              </div>
              <div>
                <h3
                  className="text-md font-medium text-neutral-900"
                  title={todo.text}
                >
                  {todo.completed ? (
                    <span
                      className="line-through text-neutral-500"
                      title={todo.text}
                    >
                      {todo.text}
                    </span>
                  ) : (
                    todo.text
                  )}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="text-primary hover:bg-neutral-100 p-2 rounded-full focus:outline-none"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <FaTrash className="text-neutral-500" />
              </button>
              <button
                className="text-neutral-50 bg-primary hover:bg-primary p-2 rounded-full focus:outline-none"
                onClick={() =>
                  dispatch(
                    toggleTodo({
                      id: todo.id,
                      progress: todo.completed ? 0 : 100,
                    }),
                  )
                }
              >
                {todo.completed ? <FaCheckCircle /> : <FaRegCircle />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodosList;
