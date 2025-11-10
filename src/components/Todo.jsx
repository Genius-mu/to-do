import React, { useEffect, useState } from "react";
import Popup from "../extras/Popup";
import { Pen, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Todo = () => {
  const [ButtonPopUp, setButtonPopUp] = useState(false);
  const [TimedPopUp, setTimedPopUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopUp(true);
    }, 2000);
  }, []);

  const [InpVal, setInpVal] = useState("");

  const [AllTodos, setAllTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(AllTodos));
  }, [AllTodos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (InpVal.trim() === "") return;
    setAllTodos([...AllTodos, { TodoName: InpVal }]);
    setInpVal("");
    setButtonPopUp(false);
    toast.success("Todo added successfully!");
  };

  const [EditIndex, setEditIndex] = useState(null);
  const [IsEditing, setIsEditing] = useState(false);

  const handleEdit = (index) => {
    setInpVal(AllTodos[index].TodoName);
    setEditIndex(index);
    setIsEditing(true);
    setButtonPopUp(true);
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    if (InpVal.trim() === "") return;

    const updatedTodos = [...AllTodos];
    updatedTodos[EditIndex].TodoName = InpVal;

    setAllTodos(updatedTodos);
    setInpVal("");
    setIsEditing(false);
    setEditIndex(null);
    setButtonPopUp(false);
    toast.success("Todo updated successfully!");
  };

  const handleDelete = (index) => {
    toast((t) => (
      <span>
        Confirm delete?
        <button
          onClick={() => {
            const newList = AllTodos.filter((_, i) => i !== index);
            setAllTodos(newList);
            toast.dismiss(t.id);
            toast.error("Todo deleted!");
          }}
          className="ml-2 bg-red-600 px-2 py-1 text-white rounded"
        >
          Yes
        </button>
      </span>
    ));
  };

  const toggleComplete = (index) => {
    const updated = [...AllTodos];
    updated[index].completed = !updated[index].completed;
    setAllTodos(updated);
  };

  return (
    <>
      <main className="w-full h-screen">
        <header className="w-full h-[5em] flex justify-center items-center">
          <div className="w-[90%] h-full flex justify-between items-center">
            <h2 className="text-[18px] sm:text-2xl font-bold">
              Unpopular Todo
            </h2>
            <button
              onClick={() => {
                setButtonPopUp(!ButtonPopUp);
                setIsEditing(false);
                setInpVal("");
              }}
              className="bg-blue-600 sm:text-[15px] text-[13px] hover:bg-blue-700 transition duration-300 py-2 px-3 sm:px-5 rounded sm:rounded-xl text-white"
            >
              {IsEditing ? "Edit Todo" : "Add Todo"}
            </button>
            <Popup trigger={ButtonPopUp} setTrigger={setButtonPopUp}>
              <form
                onSubmit={IsEditing ? handleUpdateTodo : handleAddTodo}
                className="w-full mt-4 h-fit flex flex-col justify-center gap-y-5 items-center"
              >
                <input
                  type="text"
                  placeholder="Todo Name.."
                  value={InpVal}
                  onChange={(e) => setInpVal(e.target.value)}
                  className="w-full pl-3 py-2 border-2 outline-none border-blue-600 rounded"
                />
                <span className="w-full h-fit flex justify-end">
                  <button
                    type="submit"
                    className="w-fit py-1 cursor-pointer rounded px-4 bg-blue-600 transition duration-100 hover:bg-blue-700 text-white"
                  >
                    {IsEditing ? "Edit Todo" : "Add Todo"}
                  </button>
                </span>
              </form>
            </Popup>
            {/* <Popup trigger={TimedPopUp} setTrigger={setTimedPopUp}>
              <h3 className="text-black">My Popup</h3>
            </Popup> */}
          </div>
        </header>
        <span className="w-full flex py-4 justify-center items-center">
          <hr className="w-[90%]" />
        </span>
        <section className="w-full h-fit flex justify-center items-center">
          <div className="w-[90%] h-full flex flex-col justify-center gap-y-5 items-center">
            {AllTodos.length === 0 ? (
              <p className="text-gray-500 mt-5">No todos yet 😴</p>
            ) : (
              <AnimatePresence>
                {AllTodos.map((todo, index) => (
                  <>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      layout
                      className="flex justify-between items-center rounded-xl bg-white w-full px-3 py-5 shadow-xl"
                    >
                      <motion.h2
                        animate={{
                          opacity: todo.completed ? 0.5 : 1,
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-[14px] max-w-[10px] sm:text-xl font-semibold"
                      >
                        {todo.TodoName}
                      </motion.h2>

                      <span className="flex justify-center items-center gap-x-3">
                        <button
                          onClick={() => handleDelete(index)}
                          className="border-r border-black/40 pr-3"
                        >
                          <Trash2 className="sm:w-5 sm:h-5 w-3 h-3 text-red-600 hover:translate-y-[-5px] transition duration-200" />
                        </button>
                        <button
                          onClick={() => handleEdit(index)}
                          className="border-r border-black/40 pr-3 hover:translate-y-[-5px] transition duration-200"
                        >
                          <Pen className="sm:w-5 sm:h-5 w-3 h-3 text-blue-600" />
                        </button>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(index)}
                          className="sm:w-5 sm:h-5 w-3 h-3 hover:translate-y-[-5px] transition duration-200"
                        />
                      </span>
                    </motion.div>
                  </>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>
        <Toaster position="top-left" />
      </main>
    </>
  );
};

export default Todo;
