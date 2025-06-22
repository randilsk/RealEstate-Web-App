import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';

import DBreports from '../../../components/Admin/DBreports';
import AdminNavbar from '../AdminNavbar';

function Dashboard() {
    return (
        <>
        <div className='flex flex-col'> 
            <AdminNavbar/>
            <div className='flex-1 ml-64'>
            <DBreports/>
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;