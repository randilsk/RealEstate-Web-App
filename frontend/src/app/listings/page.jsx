"use client";
import React, { useState, useEffect } from "react";


export default function Listings() {


     const [listCount, setListCount] = useState(0);
        const [loading, setLoading] = useState(true);
        const [users, setUsers] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/auth/getallListing');
                setUsers(response.data);
                setUserCount(response.data.length);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchUsers();
            const interval = setInterval(fetchUsers, 30000);
            return () => clearInterval(interval);
        }, []);
    
        const handleUserCardClick = () => {
            setIsModalOpen(true);
        };
    
    
                        <



    return(
        <>
        
        
        </>
    );
}