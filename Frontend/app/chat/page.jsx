"use client";
import ChatsPage from "@/components/ChatPage/index";
import { useState,useEffect } from "react";
import Sidenav from "@/components/navigation/Sidenav";

function  Chats(){

    const [userId, setUserId] = useState(null); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') { 
          const storedUserId = localStorage.getItem("userId");
          setUserId(Number(storedUserId));
          if (storedUserId) {
            fetchProfileData(storedUserId);
            if(userId){
            }
          }
        }
      }, []); 

      const fetchProfileData = async (userId) => {
        try {
          const response = await fetch(`http://localhost:8080/profile/${userId}`);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } 
      };


    return(
        <div className="flex ">
            <div className="relative flex-shrink-0 h-screen w-1/5">
                <Sidenav />
            </div>
            <div className="flex-grow ">
                {
                    user &&
                    <ChatsPage user={user}/>
                }
            </div>
        </div>         
    )
}

export default Chats;