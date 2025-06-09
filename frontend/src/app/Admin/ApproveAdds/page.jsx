import React from 'react';
import DBSideBar from '../../../components/Admin/DBSideBar';
import DBMainContentApproveAdds from '../../../components/Admin/DBMainContentApproveAdds';


function Dashboard() {
    return (
        <>
        <div className='flex'> 
            <DBSideBar/>
            <div className='flex-1 ml-64'>
            <DBMainContentApproveAdds/>
                </div>
        </div>
        </>
    );
    
}

export default Dashboard;

           