"use client";

import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../../redux/Features/user/userSlice";
import signInImage from "../../../public/images/profile_images/profile1.jpg";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import default_avatar from "../../../public/images/profile_images/default_profile.jpg"

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
    confirmPassword: "",
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      if (selectedFile.size > 4 * 1024 * 1024) {
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

    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/user/update/${userId}`,
        {
          method: "PUT",
           
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsUpdating(true);
    try {
      dispatch(updateUserStart());
      const updateData = { username: formData.username.trim() };
      if (formData.avatar) updateData.avatar = formData.avatar;
      if (formData.password && formData.password.trim()) {
        updateData.password = formData.password.trim();
      }
      const updatedUser = await updateUserProfile(currentUser._id, updateData);
      dispatch(updateUserSuccess(updatedUser));
      setUpdateSuccess(true);
      toast.success("Profile updated successfully");
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      setTimeout(() => {
        setUpdateSuccess(false);
        if (onBack) onBack();
        else router.back();
      }, 2000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBackToProfile = () => {
    if (onBack) onBack();
    else router.back();
  };

  React.useEffect(() => {
    if (currentUser && !formData.username) {
      setFormData((prev) => ({
        ...prev,
        username: currentUser.username || "",
      }));
      
    }
  }, [currentUser, formData.username]);
  React.useEffect(() => {
    if (currentUser && !formData.avatar) {
      setFormData((prev) => ({
        ...prev,
        avatar: currentUser.avatar || "",
      }));
      
    }
  }, [currentUser, formData.avatar]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src={signInImage} alt="background" fill className="object-cover" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={handleBackToProfile}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow border border-white/30 hover:bg-white/30 transition-all duration-200 focus:outline-none"
        >
          ←
        </button>
      </div>

      <Toaster position="top-center" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full">
          <h1 className="text-white text-2xl font-light mb-6 text-center">
            Edit Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
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
                  src={
                    formData.avatar || currentUser?.avatar || default_avatar
                  }
                  alt="profile"
                  className="rounded-full h-24 w-24 object-cover cursor-pointer border-4 border-white/30 shadow-lg hover:opacity-80 transition-opacity"
                  width={96}
                  height={96}
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {filePerc}%
                    </span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 transition-colors"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Change Photo"}
              </button>
              {fileUploadError && (
                <p className="text-red-400 text-sm text-center">
                  {fileUploadError}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-white/10 border ${
                  errors.username
                    ? "border-red-500"
                    : "border-white/20 focus:border-blue-400"
                } text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 outline-none`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Passwords */}
            <div className="space-y-4 pt-4 border-t border-white/20">
              <h3 className="text-lg font-medium text-white">Change Password</h3>
              <p className="text-sm text-white/60">
                Leave blank if you don't want to change your password
              </p>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg bg-white/10 border ${
                    errors.password
                      ? "border-red-500"
                      : "border-white/20 focus:border-blue-400"
                  } text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 outline-none`}
                  placeholder="Enter new password"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg bg-white/10 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/20 focus:border-blue-400"
                  } text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 outline-none`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isUpdating || isUploading}
              className={`w-full rounded-lg p-3 font-semibold uppercase transition-all ${
                isUpdating || isUploading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-[1.02] hover:shadow-lg"
              }`}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>

            {updateSuccess && (
              <div className="p-3 bg-green-500/20 border border-green-400/50 rounded-lg">
                <p className="text-green-300 text-center text-sm font-medium">
                  Profile updated successfully! Redirecting...
                </p>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-center text-xs text-white/60">
              Keep your profile information up to date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}