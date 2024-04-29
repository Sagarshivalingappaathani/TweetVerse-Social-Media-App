"use client"
import React, { useState, useEffect } from "react";
import Post from "../timeline/Post/Post.js";
import Suggestions from "../timeline/Suggestions/Follwers.js";
import Trending from "../timeline/Suggestions/Trending.js";
import { fetchReels} from "@/hooks/getPostsDetails.js";

function ReelsPage() {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchReels();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData(); 

  }, []);

  return (
    <div className="mx-auto flex h-screen">
      <div className="flex-1/2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => (
            <Post
              key={index}
              user={post.user} 
              postImage={post.media_url}
              content={post.content}
              timestamp={post.posted_at}
              likes={post.like_count}
              postId={post.post_id}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto flex-1/4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <Suggestions />
        <Trending />
      </div>
    </div>
  );
}

export default ReelsPage;
