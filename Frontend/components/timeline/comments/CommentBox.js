// CommentBox.jsx

import React, { useState } from 'react';
import { commentToPost } from '@/hooks/getCommentsDetails.js';

function CommentBox({ postId, userId, onCommentPosted }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostClick = async () => {
    try {
      const success = await commentToPost(postId, userId, comment);

      if (success) {
        console.log('Comment posted successfully!');
        setComment('');

        // Notify the parent component (CommentPage) about the new comment
        if (onCommentPosted) {
          onCommentPosted();
        }
      } else {
        console.error('Error posting comment');
      }
    } catch (error) {
      console.error('Error posting comment: ', error.message || error);
    }
  };

  return (
    <div className="my-2 rounded-xl bg-white p-4 flex items-center">
      <input
        type="text"
        placeholder="Add a comment..."
        className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        value={comment}
        onChange={handleCommentChange}
      />
      <button
        className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handlePostClick}
      >
        Post
      </button>
    </div>
  );
}

export default CommentBox;
