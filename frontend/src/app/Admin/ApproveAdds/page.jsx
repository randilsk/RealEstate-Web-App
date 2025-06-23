import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBMainContentApproveAdds from '../../../components/Admin/DBMainContentApproveAdds';
import AdminNavbar from '../AdminNavbar';


function Dashboard() {
    return (
        <>
        <div className='flex flex-col'>
            <div className=''> 
            <AdminNavbar/>
            <div className='p-10'>
            <DBMainContentApproveAdds/>
                </div>
        </div>

        </div>
        
        </>
    );
    
}

export default Dashboard;

           