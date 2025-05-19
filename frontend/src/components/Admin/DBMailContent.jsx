"use client";

import { useState } from "react";
import { FaBell, FaUserCircle, FaSave, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const SIDEBAR_BG = "bg-[#3B50DF]";
const SIDEBAR_TEXT = "text-white";
const SIDEBAR_ACTIVE = "bg-white text-[#3B50DF] font-bold";
const SIDEBAR_ICON = "text-2xl";
const CARD = "bg-white rounded-xl shadow-md p-6 mb-6";
const SECTION_HEADER = "text-lg font-bold mb-4 text-[#3B50DF]";

export default function DBMailContent() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to Urban Nest!",
      content: "Dear {userName},\n\nWelcome to Urban Nest! We're excited to have you join our community...",
      type: "welcome",
      isActive: true
    },
    {
      id: 2,
      name: "Property Listing Confirmation",
      subject: "Your Property Has Been Listed",
      content: "Dear {userName},\n\nYour property has been successfully listed on Urban Nest...",
      type: "listing",
      isActive: true
    },
    {
      id: 3,
      name: "Password Reset",
      subject: "Reset Your Password",
      content: "Dear {userName},\n\nWe received a request to reset your password...",
      type: "password",
      isActive: true
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
    type: "welcome",
    isActive: true
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id ? selectedTemplate : t
      ));
    }
    setIsEditing(false);
  };

  const handleAddTemplate = () => {
    const newId = Math.max(...templates.map(t => t.id)) + 1;
    setTemplates([...templates, { ...newTemplate, id: newId }]);
    setNewTemplate({
      name: "",
      subject: "",
      content: "",
      type: "welcome",
      isActive: true
    });
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (selectedTemplate) {
      setSelectedTemplate(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      setNewTemplate(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-64 ${SIDEBAR_BG} flex flex-col min-h-screen`}>
        <div className="p-6 border-b border-[#3B50DF]">
          <h2 className="text-2xl font-bold text-white tracking-wide">Urban Nest</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${SIDEBAR_ACTIVE}`}
              >
                <FaBell className={SIDEBAR_ICON} />
                <span className="font-medium">Email Templates</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-[#3B50DF] p-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search templates..."
            className="p-2 border rounded-md w-1/3 text-black"
          />
          <div className="flex gap-4 text-2xl text-white">
            <FaBell className="cursor-pointer hover:text-indigo-200" />
            <FaUserCircle className="cursor-pointer hover:text-indigo-200" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3B50DF]">Email Templates</h1>
            <button
              onClick={handleAddTemplate}
              className="flex items-center gap-2 bg-[#3B50DF] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus />
              Add Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template List */}
            <div className="md:col-span-1">
              <div className={CARD}>
                <h2 className={SECTION_HEADER}>Templates</h2>
                <div className="space-y-2">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedTemplate?.id === template.id
                          ? 'bg-[#3B50DF] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm opacity-75">{template.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Editor */}
            <div className="md:col-span-2">
              {selectedTemplate ? (
                <div className={CARD}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={SECTION_HEADER}>
                      {isEditing ? 'Edit Template' : 'View Template'}
                    </h2>
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-2 bg-[#3B50DF] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <FaEdit />
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                          <FaSave />
                          Save
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(selectedTemplate.id)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Template Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={selectedTemplate.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={selectedTemplate.subject}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        name="content"
                        value={selectedTemplate.content}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows="10"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={selectedTemplate.isActive}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={CARD}>
                  <p className="text-gray-500 text-center">
                    Select a template to view or edit
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 