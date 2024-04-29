import { Avatar } from "@mui/material";
import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';

function Comment({ user,content }) {
    
  return (
    <div className="w-full max-w-2xl mx-auto my-4"> 
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between items-center font-bold">
            <div className="flex items-center  bg-transparent rounded-lg px-4">
                <Avatar src={`http://localhost:8080/${user.profile_path}`} alt='skpsmpsap' className="mr-2 w-8 h-8" />
                <a href={`/profile/${user.user_id}`}><span className="text-xl  hover:text-blue-500">{user.displayname}</span></a>
            </div>
        </div>
      </div>
      <div class="p-2 rounded-lg shadow-md ml-4 mb-2">
        <p class=" text-base leading-6">{content}</p>
    </div>
    </div>
  );
}

export default Comment;
