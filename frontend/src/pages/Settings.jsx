import React, { useContext, useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/Input/ProfilePhotoSelector";
import uploadImage from "../utils/UploadImage";

const Settings = () => {
  const { user, updateUser } = useContext(UserContext);

  const [name, setName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      let profileImage = user?.profileImage || "";

      // upload new image if selected
      if (profilePic) {
        const imgRes = await uploadImage(profilePic);
        profileImage = imgRes.imageUrl;
      }

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        {
          name,
          profileImage,
        }
      );

      updateUser(response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Account Settings
          </h2>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector
              image={profilePic}
              setImage={setProfilePic}
            />
          </div>

          {/* NAME */}
          <div className="mb-5">
            <label className="text-xs text-slate-400">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="text-xs text-slate-400">
              Email (read only)
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="form-input opacity-60 cursor-not-allowed"
            />
          </div>

          {/* SAVE */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg py-3 hover:bg-indigo-500/30 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
