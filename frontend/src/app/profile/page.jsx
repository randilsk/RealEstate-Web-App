"use client";

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../lib/firebase"; // Adjust the import path as needed
import axios from "axios"; // Import axios for API calls


export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError("Image upload error (max 2MB)");
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
          setFileUploadError(""); // Clear any previous errors
        });
      }
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setFileUploadError("File size exceeds 2MB limit");
        return;
      }
      setFile(selectedFile);
      handleFileUpload(selectedFile);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  // Add the updateUserProfile function here
  const updateUserProfile = async (userId, data) => {
    try {
      const response = await axios.put(`/api/user/update/${userId}`, data);
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateUserProfile function with the current user ID and form data
      await updateUserProfile(currentUser._id, formData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic
    console.log("Delete account clicked");
  };

  const handleSignOut = () => {
    // Implement sign out logic
    console.log("Sign out clicked");
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
       
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser?.avatar || "/default-avatar.png"} // Fallback to default avatar
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {fileUploadError && (
          <p className="text-red-700 text-center">{fileUploadError}</p>
        )}
        {filePerc > 0 && filePerc < 100 && (
          <p className="text-slate-700 text-center">{`Uploading: ${filePerc}%`}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser?.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser?.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}