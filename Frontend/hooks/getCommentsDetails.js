import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const commentToPost = async (postId,userId,content) => {
    try {
        const response = await axios.post('http://localhost:8080/comment', {postId,userId, content} );
        if (response.status === 201) {
          console.log('User commented successfully!');
          return true;
        } else {
            throw new Error();
        }
    } catch (err) {
       console.error('Error creating a new comment: ', err.message || err);
       return false;
    }   
};

export const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/getcomment/${postId}`);
      const fetchedComments = response.data;
      const commentsWithUserDetails = await Promise.all(
        fetchedComments.map(async (comment) => {
          const userResponse = await axios.get(`${BASE_URL}/userDetails/${comment.user_id}`);
          const user = userResponse.data;
          return { ...comment, user }; 
        })
      );
     return  commentsWithUserDetails;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


     
