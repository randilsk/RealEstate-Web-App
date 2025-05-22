import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBusers from '../../../components/Admin/DBusers';


function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1 ml-64'>
            <DBusers/>
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;