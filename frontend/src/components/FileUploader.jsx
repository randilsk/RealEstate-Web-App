"use client";
import React, { useState } from "react";
import Image from "next/image";

function FileUploader({ onImagesChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Create preview URLs for the selected files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    // Notify parent component about the new images
    if (onImagesChange) {
      onImagesChange([...selectedFiles, ...files]);
    }
  };

  const removeImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
    
    // Notify parent component about the removed image
    if (onImagesChange) {
      onImagesChange(newFiles);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Hidden File Input */}
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />

      {/* Custom Label/Button */}
      <label
        htmlFor="file-upload"
        className="bg-gray-400 text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-main-blue hover:text-white mb-4"
      >
        Upload Photos
      </label>

      {/* Image Previews */}
      <div className="w-full h-full grid grid-cols-3 gap-2 p-2 overflow-y-auto">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={url}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUploader;
