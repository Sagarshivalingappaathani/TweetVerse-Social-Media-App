'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, userData,updateOfUserDetails}) => {
  const [formData, setFormData] = useState({
    userId :userData?.user?.user_id || "",
    fullName: userData?.user?.displayname || "", 
    username: userData?.user?.username || "",
    bio: userData?.user?.bio || "", 
  });
  
  const [file, setFile] = useState();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)
    try {
     const response = await axios.post(`http://localhost:8080/upload/${userData?.user?.user_id}`, formData );
     if (response.status === 201) {
       console.log('Upload successfully!');
       alert('Upload successful!');
     } else {
       console.error('Failed to Upload:', response.status, response.statusText);
     }
    } catch (error) {
      console.error('Error Uploading :', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Profile updated successfully!");
        updateOfUserDetails();
        onClose(); 
      } else {
        console.error("Error updating profile:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto p-4 mt-20 bg-white rounded-md shadow-md w-1/2">
        <div className="flex items-center mb-4">
          <h2 className="text-xl text-black font-bold">Edit Profile</h2>
        </div>
        
        <div className="flex flex-row items-center space-x-4 mb-4">
          <label htmlFor="fullName" className="block text-black text-sm font-medium">
          Edit Profile Photo
          </label>
          <div className="relative border border-gray-300 rounded-md px-2 py-1 flex items-center justify-between bg-white w-80">
          <input
          type="file"
          id="fileInput"
          className="absolute inset-0 opacity-0 h-full cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
          />
          <span className="text-gray-500">Choose Image</span>
          {file && (
          <span className="truncate text-black">{file.name}</span>
          )}
          </div>
          <button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded transition duration-300 ease-in-out"
          onClick={handleUpload}
          >
          Upload
          </button>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-black text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.fullName} // Pre-fill with form data
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.username} // Pre-fill with form data
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-black text-sm font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows="4"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Bio"
              value={formData.bio} 
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-white font-medium" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
