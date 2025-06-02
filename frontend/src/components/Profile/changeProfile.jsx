"use client";

import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../../redux/Features/user/userSlice";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';

export default function EditProfile({ onBack }) {
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    avatar: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFileUpload = (file) => {
    setIsUploading(true);
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
        setIsUploading(false);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
          setFileUploadError("");
          setIsUploading(false);
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
      setFileUploadError("");
      handleFileUpload(selectedFile);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
    // Clear errors when user starts typing
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation (only if user wants to change password)
    if (formData.password || formData.confirmPassword) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateUserProfile = async (userId, data) => {
    try {
      const response = await fetch(`/api/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update profile');
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUpdating(true);
    
    try {
      dispatch(updateUserStart());

      // Prepare data to send
      const updateData = {
        username: formData.username.trim(),
      };

      // Add avatar if it was uploaded
      if (formData.avatar) {
        updateData.avatar = formData.avatar;
      }

      // Add password if user wants to change it
      if (formData.password && formData.password.trim()) {
        updateData.password = formData.password.trim();
      }

      const updatedUser = await updateUserProfile(currentUser._id, updateData);
      
      dispatch(updateUserSuccess(updatedUser));
      setUpdateSuccess(true);
      toast.success("Profile updated successfully");

      // Clear password fields after successful update
      setFormData((prevData) => ({
        ...prevData,
        password: "",
        confirmPassword: ""
      }));

      setTimeout(() => {
        setUpdateSuccess(false);
        if (onBack) {
          onBack();
        } else {
          router.back();
        }
      }, 2000);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message || "Failed to update profile");
      console.error("Update failed", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBackToProfile = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Initialize username from current user
  React.useEffect(() => {
    if (currentUser && !formData.username) {
      setFormData((prevData) => ({
        ...prevData,
        username: currentUser.username || ""
      }));
    }
  }, [currentUser, formData.username]);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${signInImage.src})`,
      }}
    >
      <Toaster position="top-center" />
      <div
        className="w-[450px] rounded-[48px] p-6 max-w-lg mx-auto shadow-lg border max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "#d9d9d9", borderTopWidth: "4px" }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToProfile}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold text-center flex-1">
            Edit Profile
          </h1>
          <div className="w-8"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center space-y-3">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
            
            <div className="relative">
              <Image
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser?.avatar || "/default-avatar.png"}
                alt="profile"
                className="rounded-full h-24 w-24 object-cover cursor-pointer border-4 border-white shadow-lg hover:opacity-80 transition-opacity"
                width={96}
                height={96}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="text-white text-xs font-semibold">
                    {filePerc}%
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Change Photo"}
            </button>

            {fileUploadError && (
              <p className="text-red-600 text-sm text-center">{fileUploadError}</p>
            )}
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Password Section */}
          <div className="space-y-4 pt-4 border-t border-gray-300">
            <h3 className="text-lg font-medium text-gray-800">Change Password</h3>
            <p className="text-sm text-gray-600">Leave blank if you don't want to change your password</p>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter new password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={isUpdating || isUploading}
            className={`w-full text-white rounded-lg p-3 font-semibold uppercase transition-all ${
              isUpdating || isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>

          {/* Success Message */}
          {updateSuccess && (
            <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-700 text-center text-sm font-medium">
                Profile updated successfully! Redirecting...
              </p>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <p className="text-center text-xs text-gray-500">
            Keep your profile information up to date
          </p>
        </div>
      </div>
    </div>
  );
}