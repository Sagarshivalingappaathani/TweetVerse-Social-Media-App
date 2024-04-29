import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from "../timeline/Post/Post.js";

function UserPosts({ postsData ,currentUserId,updateOfUserDetails}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const fetchedPosts = postsData;
        const postsWithUserDetails = await Promise.all(
          fetchedPosts.map(async (post) => {
            const userResponse = await axios.get(`http://localhost:8080/userDetails/${post.user_id}`);
            const user = userResponse.data;
            return { ...post, user };
          })
        );
        setPosts(postsWithUserDetails);
      
      } catch (error) {
       
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="grid grid-cols-1 gap-4 text-black">
       {posts.length === 0 ? (
        <div className="p-8 text-xl mt-16">
          <p>No posts to display.</p>
          <div className="mt-4">
            <p>It seems like there are no posts available at the moment.</p>
            <p>Feel free to explore other sections of our website or check back later</p>
          </div>
        </div>
        ) : (
        posts.map((post, index) => (
          <Post
            key={index}
            user={post.user} 
            postImage={post.media_url}
            content={post.content}
            timestamp={post.posted_at}
            postId={post.post_id}
            currentUserId={currentUserId}
            updateOfUserDetails={updateOfUserDetails}
          />
        ))
        )}
    </div>
  );
}

export default UserPosts;

