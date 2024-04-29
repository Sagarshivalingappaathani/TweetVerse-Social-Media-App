import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getposts`);
      const fetchedPosts = response.data;
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const userResponse = await axios.get(`${BASE_URL}/userDetails/${post.user_id}`);
          const user = userResponse.data;
          return { ...post, user }; 
        })
      );
     return  postsWithUserDetails;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  export const fetchPostByPostId = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${postId}`); 
      const fetchedPost = response.data[0];
      if (fetchedPost) { 
        const userResponse = await axios.get(`${BASE_URL}/userDetails/${fetchedPost.user_id}`); // Fetch user details
        const user = userResponse.data;
        return { ...fetchedPost, user }; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error; 
    }
  };

  export const fetchPostsByHashTag = async (hashTag_name) => {
    try {
      const response = await axios.get(`${BASE_URL}/hashtag/${hashTag_name}`);
      const fetchedPosts = response.data;
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const userResponse = await axios.get(`${BASE_URL}/userDetails/${post.user_id}`);
          const user = userResponse.data;
          return { ...post, user }; 
        })
      );
     return  postsWithUserDetails;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  export const fetchPostsBySearchQuery = async (searchQuery) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/${searchQuery}`);
      const fetchedPosts = response.data;
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const userResponse = await axios.get(`${BASE_URL}/userDetails/${post.user_id}`);
          const user = userResponse.data;
          return { ...post, user };
        })
      );
      return postsWithUserDetails;
    } catch (error) {
      console.error("Error fetching posts by search query:", error);
    }
  };

  export const fetchReels = async() => {
    try {
      const response = await axios.get(`${BASE_URL}/getreels`);
      const fetchedPosts = response.data;
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const userResponse = await axios.get(`${BASE_URL}/userDetails/${post.user_id}`);
          const user = userResponse.data;
          return { ...post, user }; 
        })
      );
     return  postsWithUserDetails;
    } catch (error) {
      console.error("Error fetching Reels:", error);
    }
  }

  export const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
      if (response.status === 200) {
        return { success: true, message: 'Post deleted successfully!' };
      } else {
        return { success: false, error: 'Failed to delete post' };
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      return { success: false, error: 'Failed to delete post' };
    }
  };
  