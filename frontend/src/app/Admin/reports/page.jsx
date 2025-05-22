import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBtransaction from '../../../components/Admin/DBreports';
import DBreports from '../../../components/Admin/DBreports';



function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1'>
            <DBreports/>
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;