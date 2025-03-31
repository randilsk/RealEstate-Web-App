import React from 'react';
import DBSideBar from '../../components/Admin/DBSideBar';
import DBmap from '../../components/Admin/DBmap';
import DBMainContent from '../../components/Admin/DBMainContent';


function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1'>
            <DBMainContent/>
            <DBmap/>
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;

           