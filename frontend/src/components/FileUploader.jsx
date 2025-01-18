"use client";
import React, { useState } from "react";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden File Input */}
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Custom Label/Button */}
      <label
        htmlFor="file-upload"
        className="bg-gray-400 text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-main-blue hover:text-white"
      >
        Upload Photos
      </label>

      {/* Display Selected File */}
      {selectedFile && (
        <p className="text-gray-500 mt-2">Selected File: {selectedFile.name}</p>
      )}
    </div>
  );
}

export default FileUpload;
