'use client'
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

function Sidenav() {
  
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [userDetails, setUserDetails] = useState({
    displayname: '',
    profile_path: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);

      if (storedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/userDetails/${storedUserId}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchData();
  }, [])
  
  return (
    <div className="fixed flex flex-col justify-between z-10 ">
      <h1 className="text-3xl ml-5 font-mono   my-8">Tweetverse</h1>
      <div className="flex flex-col gap-5">
        <Link href='/home'>
          <button className="flex items-center  bg-transparent rounded-lg px-4 py-2 hover:bg-gray-100">
            <HomeIcon />
            <span className="ml-4 text-xl font-bold">Home</span>
          </button>
        </Link>
        <Link href='/search'>
          <button className="flex items-center  bg-transparent rounded-lg px-4 py-2 hover:bg-gray-100">
            <SearchIcon />
            <span className="ml-4 text-xl font-bold">Search</span>
          </button>
        </Link>
        <button className="flex items-center bg-transparent rounded-lg px-4 py-2 hover:bg-gray-100">
          <ExploreIcon />
          <span className="ml-4 text-xl font-bold">Explore</span>
        </button>
        <Link href='/reels'>
          <button className="flex items-center  bg-transparent rounded-lg px-4 py-2 hover:bg-gray-100">
            <SlideshowIcon />
            <span className="ml-4 text-xl font-bold">Reels</span>
          </button>
        </Link>
        <Link href='/chat'>
          <div className="flex items-center  bg-transparent rounded-lg px-4 py-2 hover:bg-gray-100">
            <ChatIcon />
            <span className="ml-4 text-xl font-bold">Messages</span>
          </div>
        </Link> 
        <Link href='/createpost'>
          <button className="flex items-center  bg-transparent rounded-lg px-4 py-2 hover:bg-gray-100">
            <AddCircleOutlineIcon />
            <span className="ml-4 text-xl font-bold">Post</span>
          </button>
        </Link>
      </div>
      
      <div className="fixed bottom-3">
        <Link href={`/profile/${userId}`}>
          <button  className=" flex items-center rounded-lg  py-4 px-4 hover:bg-gray-500" >
            <Avatar src={`http://localhost:8080/${userDetails.profile_path}`} alt='profile' className="mr-2 w-8 h-8" />
            <span className="text-xl font-bold ">Profile</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidenav;
