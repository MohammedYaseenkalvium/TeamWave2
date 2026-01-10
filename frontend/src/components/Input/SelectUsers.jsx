import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal";
import AvatarGroup from "../layouts/AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImage);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      
      {selectedUserAvatars.length === 0 && (
        <button
          className="card-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers className="text-sm" />
          <span>Add Members</span>
        </button>
      )}

      
      {selectedUserAvatars.length > 0 && (
        <div
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        
        <div className="space-y-3 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2"
            >
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-800"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">
                  {user.name}
                </p>
                <p className="text-xs text-slate-400">
                  {user.email}
                </p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900
                           text-blue-500 focus:ring-blue-500/40"
              />
            </div>
          ))}
        </div>

        
        <div className="flex justify-end gap-3 pt-4">
          <button
            className="card-btn"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="card-btn-fill"
            onClick={handleAssign}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
