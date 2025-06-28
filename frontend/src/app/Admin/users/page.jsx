import React from 'react';
import AdminNavbar from '../AdminNavbar';
import DBusers from '../../../components/Admin/DBusers';


function Dashboard() {
    return (
        <>
        <div className='flex flex-col'>
            <div className=''> 
            <AdminNavbar/>
            <div className='p-10'>
            <DBusers/>
                </div>
        </div>
        </div>
        
        </>
    );
    
}

export default Dashboard;