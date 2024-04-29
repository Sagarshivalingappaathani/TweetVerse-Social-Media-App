"use client"
import React, { useState, useEffect } from "react";
import Comment from './Comment'
import { fetchCommentsByPostId } from "@/hooks/getCommentsDetails.js";

function Commentline({ postId }) {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchDataOfComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchDataOfComments(); 

  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              user={comment.user} 
              content={comment.content}
              timestamp={comment.posted_at}
            />
          ))}
        </div>
      ) : (
        <p className="text-white mb-5 ">
          Be the first user to share your thoughts and start a conversation! 
        </p>

      )}
    </>
     
  );
}

export default Commentline;
