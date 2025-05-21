"use client";

import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaCheck, FaTimes, FaBell, FaUserCircle, FaArrowLeft, FaBed, FaBath, FaRuler, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSave, FaCar } from 'react-icons/fa';
import axios from 'axios';

// Property Details Modal Component
const PropertyDetailsModal = ({ property, onClose, onUpdate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Reset edited property when property prop changes
  useEffect(() => {
    setEditedProperty(property);
  }, [property]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedProperty(property);
    setIsEditing(false);
  };

  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const confirmSave = async () => {
    try {
      await onUpdate(editedProperty);
      setIsEditing(false);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Property' : 'Property Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Image Gallery - Read only */}
          <div className="relative mb-6">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src={property.images[currentImageIndex] || '/images/placeholder-property.jpg'}
                alt={`Property image ${currentImageIndex + 1}`}
                className="w-full h-[400px] object-cover"
              />
            </div>
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 rotate-180"
                >
                  <FaArrowLeft />
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>

          {/* Property Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
              <div className="space-y-2">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Property Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editedProperty.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Property Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editedProperty.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={editedProperty.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">District</label>
                      <input
                        type="text"
                        name="district"
                        value={editedProperty.district}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="District"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Price (Rs.)</label>
                      <input
                        type="number"
                        name="price"
                        value={editedProperty.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={editedProperty.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        placeholder="Description"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium text-gray-900">{property.title}</p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      {property.address}
                    </p>
                    <p className="text-gray-600 ml-6">{property.city}, {property.district}</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      Rs. {property.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600">{property.description}</p>
                  </>
                )}
              </div>
            </div>

            {/* Property Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Property Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={editedProperty.bedrooms}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Attached Bathrooms</label>
                      <input
                        type="number"
                        name="attachedBathrooms"
                        value={editedProperty.attachedBathrooms}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Detached Bathrooms</label>
                      <input
                        type="number"
                        name="detachedBathrooms"
                        value={editedProperty.detachedBathrooms}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Floors</label>
                      <input
                        type="number"
                        name="floors"
                        value={editedProperty.floors}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">House Area (sq ft)</label>
                      <input
                        type="number"
                        name="houseArea"
                        value={editedProperty.houseArea}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Land Area (sq ft)</label>
                      <input
                        type="number"
                        name="landArea"
                        value={editedProperty.landArea}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Build Year</label>
                      <input
                        type="number"
                        name="buildYear"
                        value={editedProperty.buildYear}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Parking</label>
                      <select
                        name="parking"
                        value={editedProperty.parking}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <FaBed className="text-indigo-500" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBath className="text-indigo-500" />
                      <span>{property.attachedBathrooms} Attached Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBath className="text-indigo-500" />
                      <span>{property.detachedBathrooms} Detached Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRuler className="text-indigo-500" />
                      <span>{property.floors} Floors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRuler className="text-indigo-500" />
                      <span>{property.houseArea} sq ft (House)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRuler className="text-indigo-500" />
                      <span>{property.landArea} sq ft (Land)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-indigo-500" />
                      <span>Built in {property.buildYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCar className="text-indigo-500" />
                      <span>Parking: {property.parking}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Property Type */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Property Type</h4>
                  {isEditing ? (
                    <select
                      name="homeType"
                      value={editedProperty.homeType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Single Family">Single Family</option>
                      <option value="Multi Family">Multi Family</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Land">Land</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-600">{property.homeType}</p>
                  )}
                </div>

                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Status</h4>
                  {isEditing ? (
                    <select
                      name="status"
                      value={editedProperty.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="sold">Sold</option>
                    </select>
                  ) : (
                    <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${property.status === 'active' ? 'bg-green-100 text-green-800' : 
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {property.status}
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editedProperty.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editedProperty.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaPhone className="text-green-500" />
                        {property.phone || 'Not provided'}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" />
                        {property.email || 'Not provided'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Coordinates */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Location Coordinates</h4>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="lat"
                      value={editedProperty.lat}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Latitude"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="lng"
                      value={editedProperty.lng}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Longitude"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-gray-600">Latitude: {property.lat || 'Not provided'}</p>
                  <p className="text-gray-600">Longitude: {property.lng || 'Not provided'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <FaSave />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back to Properties
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <FaEdit />
                Edit Property
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Changes</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to save these changes to the property?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Yes, Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DBProperty = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/listing/getallListing');
      // Transform the data to match our table structure
      const transformedProperties = response.data.map(listing => ({
        _id: listing._id,
        title: listing.address || 'No Title',
        location: `${listing.city || ''}, ${listing.district || ''}`,
        price: listing.price || 0,
        type: listing.homeType || 'Not Specified',
        status: listing.status || 'pending',
        description: listing.description || 'No description available',
        images: listing.images || ['/images/placeholder-property.jpg'],
        bedrooms: listing.bedrooms || 0,
        bathrooms: (listing.attachedBathrooms || 0) + (listing.detachedBathrooms || 0),
        area: listing.houseArea || listing.landArea || 0,
        createdAt: listing.createdAt
      }));
      setProperties(transformedProperties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (propertyToDelete) {
      try {
        await axios.delete(`/api/listing/${propertyToDelete._id}`);
        await fetchProperties();
        setShowDeleteConfirm(false);
        setPropertyToDelete(null);
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setPropertyToDelete(null);
  };

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      await axios.put(`/api/listing/${propertyId}`, { status: newStatus });
      // Refresh the properties list after status update
      await fetchProperties();
    } catch (error) {
      console.error('Error updating property status:', error);
      alert('Failed to update property status. Please try again.');
    }
  };

  const handleUpdateProperty = async (updatedProperty) => {
    try {
      await axios.put(`/api/listing/${updatedProperty._id}`, updatedProperty);
      // Refresh the properties list after update
      await fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-2 bg-gray-100 min-h-screen">
      {/* Blue Navigation Bar */}
      <div className="bg-[#3B50DF] w-full shadow-md p-4 flex justify-between items-center text-white">
        <input
          type="text"
          placeholder="Enter an address, city, district, province"
          className="p-2 border rounded-md w-1/3 text-black"
        />
        <div className="flex gap-4 text-xl">
          <FaBell className="cursor-pointer hover:text-blue-200 transition-colors" />
          <FaUserCircle className="cursor-pointer hover:text-blue-200 transition-colors" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-10">
        <div className="bg-white mt-6 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-indigo-800">Property Management</h3>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-600">Loading properties...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-gray-300 p-2 text-indigo-800">Property</th>
                    <th className="border border-gray-300 p-2 text-indigo-800">Location</th>
                    <th className="border border-gray-300 p-2 text-indigo-800">Price (Rs.)</th>
                    <th className="border border-gray-300 p-2 text-indigo-800">Type</th>
                    <th className="border border-gray-300 p-2 text-indigo-800">Details</th>
                    <th className="border border-gray-300 p-2 text-indigo-800">Status</th>
                    <th className="border border-gray-300 p-2 text-indigo-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property, index) => (
                    <tr key={property._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 p-2">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={property.images[0] || '/images/placeholder-property.jpg'} 
                            alt={property.title} 
                            className="w-20 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{property.title}</h4>
                            <p className="text-sm text-gray-500 truncate max-w-xs">{property.description.substring(0, 50)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2 text-sm text-gray-500">{property.location}</td>
                      <td className="border border-gray-300 p-2 text-sm text-gray-900">Rs. {property.price.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2 text-sm text-gray-500">{property.type}</td>
                      <td className="border border-gray-300 p-2 text-sm text-gray-500">
                        <div className="space-y-1">
                          <p>Bedrooms: {property.bedrooms}</p>
                          <p>Bathrooms: {property.bathrooms}</p>
                          <p>Area: {property.area} sq ft</p>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          value={property.status}
                          onChange={(e) => handleStatusChange(property._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-medium border
                            ${property.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 
                              property.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
                              'bg-blue-100 text-blue-800 border-blue-300'}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="sold">Sold</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <div className="flex justify-center space-x-4">
                          <button 
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                            title="View Details"
                            onClick={() => setSelectedProperty(property)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                            title="Delete Property"
                            onClick={() => handleDeleteClick(property)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Property</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this property?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onUpdate={handleUpdateProperty}
        />
      )}
    </div>
  );
};

export default DBProperty;
