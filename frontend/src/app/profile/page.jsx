"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure

} from "../../redux/Features/user/userSlice";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import default_avatar from "../../../public/images/profile_images/default_profile.jpg"

import { motion } from "framer-motion";

import slide_image_5 from "../../../public/images/profile_images/profile1.jpg";
import slide_image_6 from "../../../public/images/sign_in-images/sign1.png";
import MoreOptions from "../../components/Profile/editProfile";
import EditProfile from "../../components/Profile/changeProfile";
import UserListings from "../../components/Profile/UserListings";

export default function Profile() {
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [signOutError, setSignOutError] = useState("");

  const [currentView, setCurrentView] = useState('profile'); // 'profile', 'moreOptions', 'editProfile', 'userListings'
  const [userType, setUserType] = useState('free');
  const [loading, setLoading] = useState(true);
  const [userListings, setUserListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [listingsError, setListingsError] = useState(null);
  const [userTypeError, setUserTypeError] = useState(null);


  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch user type and listings on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.email) {
        try {
          // Reset errors
          setUserTypeError(null);
          setListingsError(null);

          // Fetch user type
          const userTypeResponse = await fetch(`http://localhost:3000/api/user/user-type?email=${(currentUser.email)}`, {
            credentials: 'include'
          });
          const userTypeData = await userTypeResponse.json();
          
          if (userTypeResponse.ok) {
            setUserType(userTypeData.userType || 'free');
          } else {
            console.error('Failed to fetch user type:', userTypeData.message);
            setUserTypeError(userTypeData.message || 'Failed to fetch user type');
            setUserType('free');
          }

          // Fetch user listings
       
          const listingsResponse = await fetch(`http://localhost:3000/api/listing/user/${currentUser.email}`, {
            credentials: 'include'
          });
          
          if (listingsResponse.ok) {
            const listingsData = await listingsResponse.json();
            setUserListings(Array.isArray(listingsData) ? listingsData : []);
          } else {
            const errorData = await listingsResponse.json();
            console.error('Failed to fetch user listings:', errorData.message);
            setListingsError(errorData.message || 'Failed to fetch listings');
            setUserListings([]);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserTypeError('Network error occurred');
          setListingsError('Network error occurred while fetching listings');
          setUserType('free');
          setUserListings([]);
          toast.error('Failed to load profile data. Please check your connection.');
        }
      }
      setLoading(false);
      setListingsLoading(false);
    };

    fetchUserData();
  }, [currentUser?.email]);

  // Retry function for failed data fetches
  const retryFetchData = async () => {
    setLoading(true);
    setListingsLoading(true);
    setUserTypeError(null);
    setListingsError(null);
    
    if (currentUser?.email) {
      try {
        // Fetch user type
        const userTypeResponse = await fetch(`http://localhost:3000/api/user/user-type?email=${encodeURIComponent(currentUser.email)}`, {
          credentials: 'include'
        });
        const userTypeData = await userTypeResponse.json();
        
        if (userTypeResponse.ok) {
          setUserType(userTypeData.userType || 'free');
        } else {
          setUserTypeError(userTypeData.message || 'Failed to fetch user type');
          setUserType('free');
        }

        // Fetch user listings
        const listingsResponse = await fetch(`http://localhost:3000/api/listings/user/:${(currentUser.email)}`, {
          credentials: 'include'
        });
        
        if (listingsResponse.ok) {
          const listingsData = await listingsResponse.json();
          setUserListings(Array.isArray(listingsData) ? listingsData : []);
        } else {
          const errorData = await listingsResponse.json();
          setListingsError(errorData.message || 'Failed to fetch listings');
          setUserListings([]);
        }
      } catch (error) {
        console.error('Error retrying fetch:', error);
        setUserTypeError('Network error occurred');
        setListingsError('Network error occurred while fetching listings');
        setUserType('free');
        setUserListings([]);
        toast.error('Failed to load profile data. Please check your connection.');
      }
    }
    setLoading(false);
    setListingsLoading(false);
  };

  const handleFileUpload = (file) => {
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
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
          setFileUploadError(""); // Clear any previous errors
          
          // Save the new avatar to the backend
          try {
            await updateUserProfile({ avatar: downloadURL });
            toast.success("Profile picture updated successfully");
          } catch (error) {
            toast.error("Failed to update profile picture");
            console.error("Error updating avatar:", error);
          }
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

  const updateUserProfile = async (updateData) => {
    try {
      dispatch(updateUserStart());
      
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      dispatch(updateUserSuccess(data));
      return data;
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      throw error;
    }
  };

  // Navigation handlers
  const handleMoreOptions = () => {
    setCurrentView("moreOptions");
  };

  const handleEditProfile = () => {
    setCurrentView("editProfile");
  };

  const handleUserListings = () => {
    setCurrentView("userListings");
  };

  const handleBackToProfile = () => {
    setCurrentView("profile");
  };

  const handleBackToMoreOptions = () => {
    setCurrentView("moreOptions");
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      // Make the signout request to the backend

      const response = await fetch('http://localhost:3000/api/auth/signout', {
        method: 'GET',

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      router.push("/sign_in");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign out");
      }

      // If successful, update Redux state and redirect
      dispatch(signOutUserSuccess());

      toast.success('Signed out successfully');
      router.push('/sign_in');


      // Clear local storage
      localStorage.removeItem("persist:root");

      // Redirect to sign-in page after a short delay
      setTimeout(() => {
        router.push("/sign_in");
      }, 1000);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      setSignOutError("Failed to sign out. Please try again.");
      toast.error(error.message || "Failed to sign out");
      console.error("Sign out failed", error);
    }
  };

  // Render based on current view
  if (currentView === "moreOptions") {
    return (
      <MoreOptions
        onBack={handleBackToProfile}
        onEditProfile={handleEditProfile}
        onUserListings={handleUserListings}
      />
    );
  }

  if (currentView === "editProfile") {
    return <EditProfile onBack={handleBackToMoreOptions} />;
  }

  if (currentView === "userListings") {
    return <UserListings onBack={handleBackToMoreOptions} />;
  }

  // Default profile view
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={slide_image_5} alt='background' fill className="object-cover" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow border border-white/30 hover:bg-white/30 transition-all duration-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      </div>

      <Toaster position="top-center" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-4xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-2xl font-light mb-2">User Profile</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Profile Info */}
            <div className="flex flex-col items-center">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* Profile Picture */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative mb-6"
              >
                <div className="relative">
                  <Image
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser?.avatar || default_avatar}
                    alt="profile"
                    className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-white/30 shadow-xl hover:scale-105 transition-transform duration-300"
                    width={128}
                    height={128}
                  />
                  {/* Online Status */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  
                  {/* User Type Badge */}
                  {!loading && (
                    <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                      userType === 'pro' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      userType === 'premium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      userType === 'basic' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      'bg-gray-500'
                    }`}>
                      {userType === 'free' ? 'FREE' : userType.toUpperCase()}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* User Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
              >
                <h2 className="text-white text-2xl font-bold mb-2">{currentUser?.username}</h2>
                <p className="text-white/80 text-sm mb-4">{currentUser?.email}</p>
                
                {/* User Type Display */}
                {!loading && (
                  <p className="text-white/90 text-sm">
                    <span className={`font-semibold ${
                      userType === 'pro' ? 'text-purple-300' :
                      userType === 'premium' ? 'text-orange-300' :
                      userType === 'basic' ? 'text-blue-300' :
                      'text-gray-300'
                    }`}>
                      {userType === 'free' ? 'Free' : userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </span> Member
                  </p>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center space-x-8 mb-6"
              >
                <div className="text-center">
                  <div className="text-white text-xl font-bold">
                    {listingsLoading ? "..." : userListings.length}
                  </div>
                  <div className="text-white/70 text-xs">Listings</div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex space-x-4 mb-6"
              >
                <button
                  onClick={handleMoreOptions}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  Edit Profile
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 backdrop-blur-sm">
                  View More
                </button>
              </motion.div>

              {/* Sign Out */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <span 
                  onClick={handleSignOut} 
                  className="text-red-300 hover:text-red-200 cursor-pointer text-sm font-medium transition-colors duration-200"
                >
                  Sign Out
                </span>
              </motion.div>

              {fileUploadError && (
                <p className="text-red-300 text-center text-sm mt-2">{fileUploadError}</p>
              )}
              {filePerc > 0 && filePerc < 100 && (
                <p className="text-blue-300 text-center text-sm mt-2">{`Uploading: ${filePerc}%`}</p>
              )}
              {signOutError && (
                <p className="text-red-300 text-center text-sm mt-2">{signOutError}</p>
              )}
            </div>

            {/* Right Side - User Listings */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-white text-lg font-semibold mb-4">MY LISTINGS</h3>
              
              {/* Listings List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {listingsLoading ? (
                  // Loading State
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : userListings.length === 0 ? (
                  // No Listings State
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm">No listings found</p>
                    <p className="text-white/50 text-xs mt-1">Start by creating your first listing</p>
                  </div>
                ) : (
                  // Dynamic Listings
                  userListings.slice(0, 3).map((listing, index) => {
                    const getHomeTypeIcon = (homeType) => {
                      switch (homeType) {
                        case 'Apartment':
                          return (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          );
                        case 'Single Family':
                        case 'Multi Family':
                          return (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          );
                        case 'Land':
                          return (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          );
                        default:
                          return (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          );
                      }
                    };

                    const getGradientColor = (index) => {
                      const gradients = [
                        'from-indigo-500 to-purple-600',
                        'from-green-500 to-blue-600',
                        'from-pink-500 to-red-600',
                        'from-yellow-500 to-orange-600',
                        'from-blue-500 to-indigo-600'
                      ];
                      return gradients[index % gradients.length];
                    };

                    const getStatusColor = (status) => {
                      switch (status) {
                        case 'approved':
                          return 'text-green-400';
                        case 'pending':
                          return 'text-yellow-400';
                        case 'rejected':
                          return 'text-red-400';
                        default:
                          return 'text-gray-400';
                      }
                    };

                    const formatPrice = (price) => {
                      if (!price) return 'Price not set';
                      return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(price);
                    };

                    return (
                      <div key={listing._id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors duration-200 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColor(index)} rounded-lg flex items-center justify-center`}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {getHomeTypeIcon(listing.homeType)}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">
                              {listing.homeType} {listing.bedrooms ? `• ${listing.bedrooms} bed` : ''}
                            </h4>
                            <p className="text-white/70 text-xs">
                              {listing.city || listing.address} • {formatPrice(listing.price)}
                            </p>
                          </div>
                          <div className={`${getStatusColor(listing.status)} text-xs font-medium capitalize`}>
                            {listing.status || 'pending'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* View All Button */}
              <button 
                onClick={handleUserListings}
                className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-200 backdrop-blur-sm border border-white/20"
              >
                View All Listings ({userListings.length})
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
