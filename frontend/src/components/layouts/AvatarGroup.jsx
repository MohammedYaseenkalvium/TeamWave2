import React from "react";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          className="w-10 h-10 rounded-full -ml-2
                     border-2 border-slate-800
                     bg-slate-700 object-cover"
        />
      ))}

      {avatars.length > maxVisible && (
        <div
          className="w-10 h-10 rounded-full -ml-2
                     border-2 border-slate-800
                     bg-slate-800
                     flex items-center justify-center
                     text-[12px] font-semibold text-slate-200"
        >
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
