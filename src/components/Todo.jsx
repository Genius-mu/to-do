import React, { useEffect, useState } from "react";
import Popup from "../extras/Popup";
import { Pen, Trash2, Plus, CheckCircle2, Circle } from "lucide-react";
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
    setAllTodos([...AllTodos, { TodoName: InpVal, completed: false }]);
    setInpVal("");
    setButtonPopUp(false);
    toast.success("Todo added successfully!", {
      icon: "✅",
      style: {
        borderRadius: "12px",
        background: "#10b981",
        color: "#fff",
      },
    });
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
    toast.success("Todo updated successfully!", {
      icon: "✏️",
      style: {
        borderRadius: "12px",
        background: "#3b82f6",
        color: "#fff",
      },
    });
  };

  const handleDelete = (index) => {
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span className="font-medium">Delete this todo?</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newList = AllTodos.filter((_, i) => i !== index);
                setAllTodos(newList);
                toast.dismiss(t.id);
                toast.error("Todo deleted!", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "12px",
                    background: "#ef4444",
                    color: "#fff",
                  },
                });
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-1.5 text-white rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1.5 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        style: {
          borderRadius: "12px",
        },
      },
    );
  };

  const toggleComplete = (index) => {
    const updated = [...AllTodos];
    updated[index].completed = !updated[index].completed;
    setAllTodos(updated);

    if (updated[index].completed) {
      toast.success("Task completed!", {
        icon: "🎉",
        duration: 2000,
        style: {
          borderRadius: "12px",
        },
      });
    }
  };

  const completedCount = AllTodos.filter((todo) => todo.completed).length;
  const totalCount = AllTodos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
      {/* Animated background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 w-full min-h-screen pb-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full py-6 backdrop-blur-sm bg-white/30 border-b border-white/50 sticky top-0 z-20 shadow-lg"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ✨ Todo List
                </h1>
                {totalCount > 0 && (
                  <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
                    {completedCount} of {totalCount} completed
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setButtonPopUp(!ButtonPopUp);
                  setIsEditing(false);
                  setInpVal("");
                }}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Todo</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>

            {/* Progress Bar */}
            {totalCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="w-full bg-white/50 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(completedCount / totalCount) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Popup Modal */}
        <Popup trigger={ButtonPopUp} setTrigger={setButtonPopUp}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {IsEditing ? "✏️ Edit Todo" : "➕ Add New Todo"}
            </h3>
            <form
              onSubmit={IsEditing ? handleUpdateTodo : handleAddTodo}
              className="w-full space-y-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={InpVal}
                  onChange={(e) => setInpVal(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-purple-300 focus:border-purple-600 outline-none rounded-xl transition-all duration-300 text-gray-800 placeholder-gray-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setButtonPopUp(false);
                    setInpVal("");
                    setIsEditing(false);
                  }}
                  className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {IsEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </Popup>

        {/* Todo List */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
          {AllTodos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                No todos yet
              </h3>
              <p className="text-gray-500">
                Click "Add Todo" to create your first task!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {AllTodos.map((todo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    layout
                    transition={{ duration: 0.3, type: "spring" }}
                    className={`
                      group relative backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300
                      ${
                        todo.completed
                          ? "bg-white/40 border-2 border-green-300/50"
                          : "bg-white/60 border-2 border-purple-300/50 hover:border-purple-400"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Checkbox + Text */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleComplete(index)}
                          className="flex-shrink-0"
                        >
                          {todo.completed ? (
                            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-500 fill-green-100" />
                          ) : (
                            <Circle className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 hover:text-purple-600 transition-colors" />
                          )}
                        </motion.button>

                        <motion.h2
                          animate={{
                            opacity: todo.completed ? 0.5 : 1,
                          }}
                          className={`
                            text-sm sm:text-lg font-semibold text-gray-800 flex-1 min-w-0 break-words
                            ${todo.completed ? "line-through" : ""}
                          `}
                        >
                          {todo.TodoName}
                        </motion.h2>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(index)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                        >
                          <Pen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover/edit:text-blue-700" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(index)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors group/delete"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 group-hover/delete:text-red-700" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Completion Badge */}
                    {todo.completed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                      >
                        ✓ Done
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#363636",
              fontWeight: "500",
            },
          }}
        />
      </main>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Todo;
