import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Image must be less than 3MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const openFilePicker = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      
      {!image ? (
        <div
          onClick={openFilePicker}
          className="w-24 h-24 rounded-full flex flex-col items-center justify-center
                     bg-slate-950 border border-slate-800 cursor-pointer
                     hover:border-slate-700 transition"
        >
          <LuUser className="w-10 h-10 text-slate-400" />
          <LuUpload className="mt-1 text-slate-500" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <img
            src={previewUrl}
            alt="profile preview"
            className="w-24 h-24 rounded-full object-cover border border-slate-800"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition"
          >
            <LuTrash /> Remove photo
          </button>
        </div>
      )}

      
      <button
        type="button"
        onClick={openFilePicker}
        className="text-xs text-blue-400 hover:text-blue-300 underline transition"
      >
        Upload photo
      </button>

      
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
