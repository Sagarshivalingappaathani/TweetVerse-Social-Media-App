"use client"
import React, { useState, useEffect } from "react";
import Post from "../timeline/Post/Post.js";
import Suggestions from "../timeline/Suggestions/Follwers.js";
import Trending from "../timeline/Suggestions/Trending.js";
import axios from 'axios';
import { fetchPostsBySearchQuery ,fetchPosts} from "@/hooks/getPostsDetails.js";
import SearchBox from "./SearchBox.js";

function Timeline() {

  const [posts, setPosts] = useState([]);
  
  const onSearchSubmit = async (searchQuery) => {
    try {
      const fetchedPosts = await fetchPostsBySearchQuery(searchQuery);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts(); 
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
        <SearchBox 
                onSearchSubmit={onSearchSubmit}
            />
       <div className="grid grid-cols-1 gap-4">
            {(posts ?? []).length === 0 ? (
                <p className="text-white text-center mt-8">
                    Oops! It seems like our explorers couldn't find any posts matching your query.
                    <br />
                    Don't worry, the journey continues! Try refining your search or explore trending topics.
                    <br />
                🚀 Happy exploring!
                </p>

            ) : (
                posts.map((post, index) => (
                <Post
                    key={index}
                    user={post.user} 
                    postImage={post.media_url}
                    content={post.content}
                    timestamp={post.posted_at}
                    likes={post.like_count}
                    postId={post.post_id}
                />
                ))
            )}
        </div>
      </div>
      <div className="mx-auto flex-1/4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <Suggestions />
        <Trending />
      </div>
    </div>
  );
}

export default Timeline;
