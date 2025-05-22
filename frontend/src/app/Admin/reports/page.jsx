import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
<<<<<<< HEAD
import DBtransaction from '../../../components/Admin/DBreports';
import DBreports from '../../../components/Admin/DBreports';

=======

import DBreports from '../../../components/Admin/DBreports';
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128


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