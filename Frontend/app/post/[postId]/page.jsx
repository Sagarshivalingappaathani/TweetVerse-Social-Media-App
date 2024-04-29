"use client";
import React ,{useState,useEffect} from "react";
import Sidenav from "@/components/navigation/Sidenav";
import Post from "@/components/timeline/Post/Post";
import Suggestions from "@/components/timeline/Suggestions/Follwers";
import Trending from "@/components/timeline/Suggestions/Trending";
import { fetchPostByPostId } from "@/hooks/getPostsDetails";
import AllComments from '../../../components/timeline/comments/AllComments'
import CommentBox from "@/components/timeline/comments/CommentBox";

function PostPage() {

  const [userId,setUserId]  = useState(null);
  const [postId,setPostId]=useState(null);
  const [post, setPost] = useState(null);
  const [commentKey, setCommentKey] = useState(0);

  useEffect(() => {
      const getpostId = window.location.pathname.split("/").pop();
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
      setPostId(getpostId);
      const fetchData = async () => {
        try {
          const fetchedPost = await fetchPostByPostId(getpostId);
          setPost(fetchedPost);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchData(); 
  }, [commentKey]);

  const handleCommentPosted = () => {
    // Refresh comments by updating the key
    setCommentKey((prevKey) => prevKey + 1);
  };


  return (
    <div className="flex">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <div className="mx-auto flex h-screen">
          <div className="flex-1/2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <div className="grid grid-cols-1 gap-4">
              {
                post && 
                <>
                  <Post
                    user={post.user} 
                    postImage={post.media_url}
                    content={post.content}
                    timestamp={post.posted_at}
                    likes={post.like_count}
                    postId={post.post_id}
                  />
                   <CommentBox userId={userId} postId={postId} onCommentPosted={handleCommentPosted} />
                   <h1 class="text-3xl font-bold text-white rounded-md shadow-lg">Users Comments</h1>
                   <AllComments
                    key={commentKey}
                    postId={post.post_id}
                  />
                </>  
              }
            </div>
          </div>
          <div className="mx-auto flex-1/4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <Suggestions />
            <Trending />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
