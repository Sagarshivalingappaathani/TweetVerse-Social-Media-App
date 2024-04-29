import { Avatar } from "@mui/material";
import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { deletePost } from "@/hooks/getPostsDetails";

function Post({ user, postImage, content , timestamp, postId,currentUserId,updateOfUserDetails}) {

  const [ liked, setLiked ] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [ bookmark, setBookmark ] = useState(false);

  const storedUserId = localStorage.getItem("userId");

  useEffect (() => {
    
    const checkUserLike = async () => {
      try {
        const response = await axios.post('http://localhost:8080/checkUserLike', {storedUserId, postId });
        const likesData = response.data.result[0];
        if(likesData.user_liked){
          setLiked(true);
        }
        setLikesCount(likesData.like_count);
      } catch(error) {
          console.error('Error checking like:', error);
      }
    }
    checkUserLike();
  }, [liked]);

  useEffect (() => {
    
    const checkUserBookmark = async () => {
      try {
        
        const response = await axios.post('http://localhost:8080/checkUserBookmark', {storedUserId, postId });
        const bookmarksData = response.data.result;
        if(bookmarksData.length !== 0){
          setBookmark(true);
        }
        
      } catch(error) {
          console.error('Error checking bookmark:', error);
      }
    }
    checkUserBookmark();
  }, []);
  
  const handleLike = async () => {
      try {
        if (liked) {
          const response = await axios.post('http://localhost:8080/deleteLike', {storedUserId, postId });
          if(response.status === 201){
            setLiked(!liked);
          }
        } else {
          const response = await axios.post('http://localhost:8080/insertLike', { storedUserId, postId });
          if(response.status === 201){
            setLiked(!liked);
          }
        }
        
      } catch (error) {
        console.error('Error toggling like:', error);
      }
  };

  const handleBookmark = async () => {
      try {
        if (bookmark) {
          const response = await axios.post('http://localhost:8080/deleteBookmark', {storedUserId, postId });
          if(response.status === 201){
            setBookmark(!bookmark);
          }
        } else {
          const response = await axios.post('http://localhost:8080/addBookmark', { storedUserId, postId });
          if(response.status === 201){
            setBookmark(!bookmark);
          }
        }
        
      } catch (error) {
        console.error('Error toggling bookmark:', error);
      }
  }

  const handleDelete = async() => {
    alert("are you really deleteing this ?");
    try {
      const response = await deletePost(postId);
      console.log(response.success)
      if(response.success){
        console.log("post deleted successfully");
        updateOfUserDetails();
        console.log("updateOfUserDetails is Called");
      }else{
        console.log("deletion failed")
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  const highlightHashtags = (text) => {
    // Regular expression to match hashtags
    const hashtagRegex = /(^|\s)(#\w+)/g;
    return text.split(hashtagRegex).map((word, index) => {
      if (word.match(hashtagRegex)) {
        return <a key={index} href={`/hashtag/${word.slice(1)}`} style={{ color: 'blue' }}>{word}</a>;
      }
      return word;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 mb-6 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar src={`http://localhost:8080/${user.profile_path}`} alt="skpsmpsap" className="w-12 h-12 rounded-full border-2 border-white" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden border-2 border-blue-500">
              <img src={`http://localhost:8080/${user.profile_path}`} alt="skpsmpsap" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <a href={`/profile/${user.user_id}`} className="text-blue-500 hover:underline text-lg font-semibold">
              {user.displayname}
            </a>
            <p className="text-gray-500 text-sm">{new Date(timestamp).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="text-base text-black leading-6">
          {highlightHashtags(content)}
        </div>

        {postImage && (
          <a href={`/post/${postId}`}>
            {postImage.endsWith('.mp4') ? (
              <video className="w-full rounded-md mt-4 border border-gray-200" controls>
                <source src={`http://localhost:8080/${postImage}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="w-full rounded-md mt-4 border border-gray-200" src={`http://localhost:8080/${postImage}`} alt="Post Image" />
            )}
          </a>
        )}
      </div>
      <div className="flex justify-between items-center px-6 py-4 border-t">
        <div className="flex items-center space-x-4">
          {liked ? (
            <FavoriteIcon className={`text-red-500 cursor-pointer w-6 h-6 transition-transform transform ${liked ? 'scale-110' : ''}`} onClick={handleLike} />
          ) : (
            <FavoriteBorderIcon className={`text-gray-500 cursor-pointer w-6 h-6 transition-transform transform ${liked ? 'scale-110' : ''}`} onClick={handleLike} />
          )}
          <a href={`/post/${postId}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="text-black font-bold cursor-pointer w-6 h-6 transition-all duration-300 hover:text-blue-500 hover:fill-blue-500"
              fill="currentColor"
            >
              <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"></path>
            </svg>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {bookmark ? (
            <BookmarkIcon className={`text-blue-500 cursor-pointer w-6 h-6 transition-transform transform ${bookmark ? 'scale-110' : ''}`} onClick={handleBookmark} />
          ) : (
            <BookmarkBorderIcon className={`text-gray-500 cursor-pointer w-6 h-6 transition-transform transform ${bookmark ? 'scale-110' : ''}`} onClick={handleBookmark} />
          )}

          {currentUserId && (
            <DeleteIcon className={`text-red-500 cursor-pointer w-6 h-6 transition-transform transform ${currentUserId ? 'scale-110' : ''}`} onClick={handleDelete} />
          )}
        </div>
      </div>
      <p className="px-6 py-4 text-sm text-gray-500">Liked by {likesCount} people.</p>
    </div>

  );
}

export default Post;



