"use client";

import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../../redux/Features/user/userSlice";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';

export default function Profile() {
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [signOutError, setSignOutError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

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
        toast.error("Image upload error (max 2MB)");
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
          setFileUploadError(""); // Clear any previous errors
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setFileUploadError("File size exceeds 2MB limit");
        toast.error("File size exceeds 2MB limit");
        return;
      }
      handleFileUpload(selectedFile);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const updateUserProfile = async (userId, data) => {
    try {
      const response = await fetch(`/api/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update profile');
      }

      console.log("User updated successfully:", responseData);
      setUpdateSuccess(true);
      toast.success("Profile updated successfully");
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating user:", error.message);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(currentUser._id, formData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        dispatch(deleteUserStart());

        // Make the delete request to the backend
        const response = await fetch(`/api/auth/delete/${currentUser._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to delete account');
        }

        // If successful, update Redux state and redirect
        dispatch(deleteUserSuccess());
        setDeleteSuccess(true);
        toast.success('Account deleted successfully');

        // Clear local storage
        localStorage.removeItem('persist:root');

        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
        setDeleteError("Failed to delete account. Please try again.");
        toast.error(error.message || "Failed to delete account");
        console.error("Delete account failed", error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      // Make the signout request to the backend
      const response = await fetch('/api/auth/signout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Inc
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign out');
      }

      // If successful, update Redux state and redirect
      dispatch(signOutUserSuccess());
      toast.success('Signed out successfully');

      // Clear local storage
      localStorage.removeItem('persist:root');

      // Redirect to sign-in page after a short delay
      setTimeout(() => {
        router.push('/sign_in');
      }, 1000);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      setSignOutError("Failed to sign out. Please try again.");
      toast.error(error.message || "Failed to sign out");
      console.error("Sign out failed", error);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${signInImage.src})`,
      }}
    >
      <Toaster position="top-center" />
      <div
        className="w-[425px] rounded-[48px] p-5 max-w-lg mx-auto shadow-lg border"
        style={{ backgroundColor: "#d9d9d9", borderTopWidth: "4px" }}
      >
        <h1 className="text-3xl text-center font-semibold my-5">
          Welcome to UrbanNest
        </h1>
        <h2 className="text-xl font-semibold my-4 text-center">Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="flex justify-center">
            <Image
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser?.avatar || "/default-avatar.png"}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
              width={96}
              height={96}
            />
          </div>

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

        {signOutError && (
          <p className="text-red-700 text-center mt-2">{signOutError}</p>
        )}
        {deleteError && (
          <p className="text-red-700 text-center mt-2">{deleteError}</p>
        )}
        {deleteSuccess && (
          <p className="text-green-700 text-center mt-2">Account deleted successfully!</p>
        )}
        {updateSuccess && (
          <p className="text-green-700 text-center mt-2">Profile updated successfully!</p>
        )}
      </div>
    </div>
  );
}