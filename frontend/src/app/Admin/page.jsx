import React from 'react';
import DBSideBar from '../../components/DBSideBar';
import DBmap from '../../components/DBmap';
import DBMainContent from '../../components/DBMainContent';


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

           