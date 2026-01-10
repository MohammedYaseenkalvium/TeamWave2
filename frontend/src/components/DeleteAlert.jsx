import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">
        {content}
      </p>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onDelete}
          className="
            flex items-center justify-center gap-1.5
            text-sm font-medium
            text-red-400
            bg-red-500/10
            border border-red-500/20
            rounded-lg
            px-4 py-2
            hover:bg-red-500/20
            transition
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
