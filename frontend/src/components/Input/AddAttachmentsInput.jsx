import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (!option.trim()) return;
    setAttachments([...attachments, option.trim()]);
    setOption("");
  };

  const handleDeleteOption = (index) => {
    const updatedList = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedList);
  };

  return (
    <div>
      
      {attachments.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-slate-950 border border-slate-800 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3">
            <LuPaperclip className="text-slate-400" />
            <p className="text-xs text-slate-200 truncate">{item}</p>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-400 hover:text-red-500 transition" />
          </button>
        </div>
      ))}

      
      <div className="flex items-center gap-4 mt-4">
        <div className="flex-1 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-md px-3">
          <LuPaperclip className="text-slate-400" />

          <input
            type="text"
            placeholder="Add file link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-slate-200 bg-transparent outline-none py-2 placeholder:text-slate-500"
          />
        </div>

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

export default AddAttachmentsInput;
