"use client";

import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from "../../redux/Features/user/userSlice";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';
import MoreOptions from '../../components/Profile/editProfile';
import EditProfile from '../../components/Profile/changeProfile';
import UserListings from '../../components/Profile/UserListings';

export default function Profile() {
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [signOutError, setSignOutError] = useState("");
  const [currentView, setCurrentView] = useState('profile'); // 'profile', 'moreOptions', 'editProfile', 'userListings'

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

  // Navigation handlers
  const handleMoreOptions = () => {
    setCurrentView('moreOptions');
  };

  const handleEditProfile = () => {
    setCurrentView('editProfile');
  };

  const handleUserListings = () => {
    setCurrentView('userListings');
  };

  const handleBackToProfile = () => {
    setCurrentView('profile');
  };

  const handleBackToMoreOptions = () => {
    setCurrentView('moreOptions');
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
        credentials: 'include',
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

  // Render based on current view
  if (currentView === 'moreOptions') {
    return (
      <MoreOptions 
        onBack={handleBackToProfile} 
        onEditProfile={handleEditProfile}
        onUserListings={handleUserListings}
      />
    );
  }

  if (currentView === 'editProfile') {
    return (
      <EditProfile 
        onBack={handleBackToMoreOptions} 
      />
    );
  }

  if (currentView === 'userListings') {
    return (
      <UserListings 
        onBack={handleBackToMoreOptions}
      />
    );
  }

  // Default profile view
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

        <div className="flex flex-col gap-4">
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
            readOnly
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser?.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
            readOnly
          />

          <button
            onClick={handleMoreOptions}
            className="bg-blue-600 text-white rounded-lg p-3 uppercase hover:opacity-95"
          >
            More Options
          </button>
        </div>

        <div className="flex justify-center mt-5">
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
      </div>
    </div>
  );
}