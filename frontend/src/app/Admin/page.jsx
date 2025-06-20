'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DBSideBar from '../../components/Admin/DBSideBar';
import DBMainContent from '../../components/Admin/DBMainContent';
import Link from 'next/link';
import signInImage from '../../../public/images/sign_in-images/signIn_Image.png';

function Dashboard() {
    const { currentUser } = useSelector((state) => state.admin);

    if (!currentUser) {
        return (
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
                {/* Left: Welcome Text & Buttons */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-indigo-700 mb-8 drop-shadow-lg"
                    >
                        Welcome to UrbanNest Admin
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl sm:text-3xl text-gray-700 mb-10"
                    >
                        Please <span className="font-semibold text-indigo-600">Sign In</span> or <span className="font-semibold text-indigo-600">Sign Up</span> to access the admin dashboard.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-4 items-center w-full max-w-xs mx-auto"
                    >
                        <Link href="/Admin/Sign-in" className="w-full px-8 py-4 bg-indigo-600 text-white rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow text-center">
                            Sign In
                        </Link>
                        <Link href="/Admin/Sign-up" className="w-full px-8 py-4 border-2 border-indigo-600 text-indigo-700 rounded-lg text-xl font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow text-center">
                            Sign Up
                        </Link>
                    </motion.div>
                </div>
                {/* Right: Animated Image */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="w-full md:w-1/2 flex items-center justify-center py-10 h-full"
                >
                    <img
                        src={signInImage.src}
                        alt="UrbanNest Admin Sign In"
                        className="w-full h-[300px] md:h-[80vh] object-cover rounded-3xl shadow-xl"
                        draggable="false"
                    />
                </motion.div>
            </div>
        );
    }

    return (
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1 ml-64'>
                <DBMainContent/>
            </div>
        </div>
    );
}

export default Dashboard;

           