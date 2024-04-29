"use client";
import React, { useState,useEffect } from 'react';
import Sidenav from "../../components/navigation/Sidenav";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Suggestions from '@/components/timeline/Suggestions/Follwers';
import Trending from '@/components/timeline/Suggestions/Trending';

const CreatePost = () => {

  const router = useRouter(); 
  const [userId,setUserId]=useState(null);
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [url,setUrl]=useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Fetch userId from localStorage and update the state
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', mediaFile)
    try {
     const response = await axios.post(`http://localhost:8080/uploadpost/${userId}`, formData );
     if (response.status === 201) {
       console.log('Upload successfully!');
       setUrl(response.data.path);

       alert('Upload successful!');
     } else {
       console.error('Failed to Upload:', response.status, response.statusText);
     }
    } catch (error) {
      console.error('Error Uploading :', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
        const response = await axios.post('http://localhost:8080/posts', 
        {userId, content, url,  location} );
        if (response.status === 201) {
          console.log('User posted successfully!');
          router.push('/home');
        } else {
          console.error('Failed to post', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error in posting', error);
      }
  };
  

  return (
    <div className="h-screen">
    <div className="flex">
      <div className="relative flex-shrink-0 w-1/5 px-4 py-8">
        <Sidenav />
      </div>
      <div className="mx-auto w-2/5">
        <div className="container mt-10 py-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Create a Post</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-4 pb-8">
            <textarea
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 h-40"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
        
         <div className="relative border border-gray-300 rounded-md px-2 py-1 flex items-center justify-between bg-white w-80">
            <input
            type="file"
            id="fileInput"
            className="absolute inset-0 opacity-0 h-full cursor-pointer"
            onChange={(e) =>  setMediaFile(e.target.files[0])}
            />
            <span className="text-gray-500">Choose Image</span>

            {mediaFile && (
            <span className="truncate text-black">{mediaFile.name}</span>
            )}

          </div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded transition duration-300 ease-in-out"
            onClick={handleUpload}> Upload
          </button>

            <input
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Your location (Optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Post
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto flex-1/4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <Suggestions />
        <Trending />
      </div>
    </div>
  </div>
  
  );
};

export default CreatePost;
