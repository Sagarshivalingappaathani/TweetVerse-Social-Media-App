"use client"
import React, { useState, useEffect } from "react";
import { getUserBySearch } from "@/hooks/getUsersDetails.js";
import SearchBox from "@/components/Search/SearchBox";
import { Avatar } from "@mui/material";

function UserSearchBox() {

  const [users, setUsers] = useState([]);
  
  const onSearchSubmit = async (searchQuery) => {
    try {
      const fetchedUsers = await getUserBySearch(searchQuery);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="my-3">
      <SearchBox 
        onSearchSubmit={onSearchSubmit}
      />
      {users.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user, index) => (
            <div key={index}>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <span className="avatar">
                        <Avatar src={`http://localhost:8080/${user.profile_path}`} />
                        </span>
                        <a href={`/profile/${user.user_id}`}>
                         <span className="ml-2 text-black font-semibold hover:text-blue-600">{user.displayname}</span>
                        </a>
                    </div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Search users by their username</p>
      )}
    </div>
  );
}

export default UserSearchBox;
