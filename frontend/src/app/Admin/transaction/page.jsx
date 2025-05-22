import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBtransaction from '../../../components/Admin/DBtransaction';

function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1 ml-64'>
                <DBtransaction/>
            </div>
        </div>
        </>
    );
}

export default Dashboard;