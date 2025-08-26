import React from "react";
import DBreports from "../../../components/Admin/DBreports";
import AdminNavbar from "../AdminNavbar";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col">
        <div className="">
          <AdminNavbar />
          <div className="p-10">
            <DBreports />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
