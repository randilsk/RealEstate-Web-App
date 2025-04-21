import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBmap from '../../../components/Admin/DBmap';
import DBusers from '../../../components/Admin/DBusers';


function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1'>
            <DBusers/>
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;