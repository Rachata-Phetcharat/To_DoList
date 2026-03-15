import { useState, useEffect, useRef } from "react";
import Modal from "./components/modal";
import "./App.css";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const formAdd = useRef();
  const formAddItem = useRef();
  const formUpdate = useRef();

  const fetchTodo = async () => {
    try {
      const res = await fetch(`${apiUrl}/todos`, {
        method: "GET",
      });

      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitTodo = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(formAdd.current);
      const formEnt = Object.fromEntries(formData.entries());
      const res = await fetch(`${apiUrl}/addTodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEnt),
      });
      if (res.ok) {
        formAdd.current.reset();
        fetchTodo();
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const onSubmitTodoItem = async (event, id) => {
    event.preventDefault();
    try {
      const formData = new FormData(formAddItem.current);
      const formEnt = Object.fromEntries(formData.entries());
      const res = await fetch(`${apiUrl}/addTodoItem/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEnt),
      });

      if (res.ok) {
        formAddItem.current.reset();
        fetchTodo();
      }
    } catch (error) {}
  };

  const updateTodo = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(formUpdate.current);
      const formEnt = Object.fromEntries(formData.entries());
      const id = formEnt.id;

      const res = await fetch(`${apiUrl}/updateTodo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEnt),
      });
      if (res.ok) {
        formUpdate.current.reset();
        fetchTodo();
      }
    } catch (error) {}
  };

  const addUpdateTodo = (item) => {
    const form = formUpdate.current;

    form.id.value = item.id;
    form.title.value = item.title;
  };

  const handleToggle = async (item, todoId, itemId) => {
    try {
      const updatedStatus = !item.completed;
      const res = await fetch(
        `${apiUrl}/updateTodoCompleted/${todoId}/items/${itemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...item,
            completed: updatedStatus,
          }),
        },
      );
      if (res.ok) {
        fetchTodo();
      }
    } catch (error) {
      console.error("Toggle Error:", error);
    }
  };

  const deleteHandle = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        fetchTodo();
      }
    } catch (error) {}
  };

  const deleteTodoItem = async (todoId, itemId) => {
    try {
      const res = await fetch(`${apiUrl}/todos/${todoId}/items/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        fetchTodo();
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="mx-60">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        เปิด Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // onSubmit={}
      />

      <nav className="bg-gray-200 rounded-xl mt-10 p-5">
        <div className="text-lg">Todo-List</div>
      </nav>

      <div className="bg-gray-200 rounded-xl mt-10 p-5">
        <h1 className="text-xl font-bold mb-4">Todo Manager</h1>

        <div className="space-y-6">
          {todos.map((list) => (
            <div key={list.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <span className="font-semibold text-lg">{list.title}</span>
                <div>
                  <button
                    className="cursor-pointer text-blue-500 mr-4"
                    onClick={() => addUpdateTodo(list)}
                  >
                    edit
                  </button>
                  <button
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteHandle(list.id)}
                  >
                    delete
                  </button>
                </div>
              </div>

              <ul className="pl-6 space-y-1">
                {list.item && list.item.length > 0 ? (
                  list.item.map((subItem) => (
                    <li key={subItem.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={subItem.completed}
                        onChange={() =>
                          handleToggle(subItem, list.id, subItem.id)
                        }
                      />
                      <span
                        className={
                          subItem.completed ? "line-through text-gray-400" : ""
                        }
                      >
                        {subItem.title}
                      </span>
                      <button
                        className="cursor-pointer text-red-500"
                        onClick={() => deleteTodoItem(list.id, subItem.id)}
                      >
                        delete
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400 italic">
                    ไม่มีรายการย่อย
                  </li>
                )}
              </ul>

              <form
                ref={formAddItem}
                onSubmit={(value) => onSubmitTodoItem(value, list.id)}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    className="w-full border-2 border-solid rounded-lg p-2 invalid:border-gray-400 bg-gray-50"
                    required
                  />
                  <button
                    type="submit"
                    className="cursor-pointer p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-200 rounded-xl mt-10 p-5">
        <h1 className="text-xl font-bold mb-4">Add Todo</h1>
        <form ref={formAdd} onSubmit={onSubmitTodo}>
          <div className="flex gap-2">
            <input
              type="text"
              name="title"
              placeholder="title"
              className="w-full border-2 border-solid rounded-lg p-2 invalid:border-gray-400 bg-gray-50"
              required
            />
            <button
              type="submit"
              className="cursor-pointer p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <form ref={formUpdate} onSubmit={updateTodo}>
        <input type="text" name="id" placeholder="id" />
        <input type="text" name="title" placeholder="title" required />
        <button type="submit" className="cursor-pointer ">
          update
        </button>
      </form>
    </div>
  );
}

export default App;
