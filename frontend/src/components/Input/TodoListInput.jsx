import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoChecklist = [], setTodoChecklist }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (!option.trim()) return;

    const newTodo = {
      text: option.trim(),
      completed: false,
    };

    setTodoChecklist([...todoChecklist, newTodo]);
    setOption("");
  };

  const handleDeleteOption = (index) => {
    const updated = todoChecklist.filter((_, idx) => idx !== index);
    setTodoChecklist(updated);
  };

  return (
    <div>
      {/* TODO ITEMS */}
      {todoChecklist.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center
                     bg-slate-950 border border-slate-800
                     px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex items-center gap-3">
            <p
              className={`text-xs leading-relaxed ${
                item.completed
                  ? "text-slate-500 line-through"
                  : "text-slate-200"
              }`}
            >
              {/* INDEX */}
              <span
                className={`text-xs font-semibold mr-2 ${
                  item.completed
                    ? "text-green-500"
                    : "text-slate-400"
                }`}
              >
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>

              {item.text}
            </p>
          </div>

          {/* DELETE */}
          <button onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash className="text-lg text-red-400 hover:text-red-500 transition" />
          </button>
        </div>
      ))}

      {/* ADD INPUT */}
      <div className="flex items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Enter task"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full text-[13px] bg-slate-950 border border-slate-800
                     rounded-md px-3 py-2 text-slate-200
                     placeholder:text-slate-500 outline-none
                     focus:border-blue-500/50 transition"
        />

        <button
          className="card-btn text-nowrap"
          onClick={handleAddOption}
        >
          <HiMiniPlus className="text-lg" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
