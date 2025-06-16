"use client";

import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBProperty from '../../../components/Admin/DBProperty';

function PropertiesPage() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1 ml-64'>
                <DBProperty/>
            </div>
        </div>
        </>
    );
}

export default PropertiesPage; 