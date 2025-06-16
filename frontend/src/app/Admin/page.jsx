import React from 'react';
import DBSideBar from '../../components/Admin/DBSideBar';
import DBMainContent from '../../components/Admin/DBMainContent';


function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1 ml-64'>
            <DBMainContent/>
            
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;

           