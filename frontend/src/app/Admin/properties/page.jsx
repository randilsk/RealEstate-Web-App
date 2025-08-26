"use client";
import React from "react";
import DBProperty from "../../../components/Admin/DBProperty";
import AdminNavbar from "../AdminNavbar";

function PropertiesPage() {
  return (
    <>
      <div className="flex flex-col ">
        <div className="">
          <AdminNavbar />
          <div className="p-10">
            <DBProperty />
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertiesPage;
