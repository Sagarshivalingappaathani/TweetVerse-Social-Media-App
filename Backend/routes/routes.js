// route.js
import express from "express";
import {
  loginUser,
  signupUser,
} from "../controllers/authcontroller.js";
import {
  getUserDetails,
  getUserBasicDetails,
  updateUserDetails,
  getUserBySearch
} from "../controllers/userController.js";
import {
  handleFileUpload,
  uploadFile,
} from "../controllers/profileUploadController.js";
import {
  handleFileUploading,
  uploadPostFiles,
} from "../controllers/postUploadController.js";
import {
  postData,
  getPosts,
  getPostsOfUser,
  getPerticularPost,
  getPostsByHashtag,
  getPostsBySearchQuery,
  getReels,
  deletePost
} from "../controllers/postsController.js";
import {
  getUserSuggestions,
  getTrendingHashtags,
} from "../controllers/suggestionsController.js";
import * as FollowerController from "../controllers/followController.js"; 

import { 
  deleteLike, 
  insertLike, 
  checkUserLike,
  deleteBookmark,
  addBookmark,
  checkUserBookmark
} from "../controllers/likesController.js"


import { 
  postComment,
  getCommentsOfPost
 } from "../controllers/commentsController.js";


const router = express.Router();

// Auth routes
router.post("/login", loginUser);
router.post("/signUp", signupUser);

// Uploading posts and photos
router.post("/upload/:userId", uploadFile, handleFileUpload);
router.post("/uploadpost/:userId", uploadPostFiles, handleFileUploading);

// Getting user details
router.get("/userDetails/:userId", getUserBasicDetails);
router.get("/profile/:userId", getUserDetails);
router.post("/updateProfile", updateUserDetails);
router.get("/suggestions/:userId", getUserSuggestions);
router.get("/search/user/:query", getUserBySearch);

// Inserting new follows of user
router.post("/setFollowingUsers", FollowerController.setFollowingUsers);
router.post("/unsetFollowingUsers", FollowerController.unsetFollowingUsers); // New route for unfollowing
router.get("/getFollowers/:userId", FollowerController.getFollowers); // New route for getting followers
router.get("/getFollowing/:userId", FollowerController.getFollowing); // New route for getting following
router.post("/checkFollowerStatus", FollowerController.checkFollowerStatus); // New route for checking follower status

// posts
router.post("/posts", postData);
router.get("/getposts", getPosts);
router.get("/post/:post_id", getPerticularPost);
router.get("/userposts/:user_id", getPostsOfUser);
router.get('/search/:search_query',getPostsBySearchQuery);
router.get('/search',getPosts);
router.get('/getreels', getReels);
router.delete('/posts/:post_id', deletePost);

// likes update and delete
router.post('/deleteLike', deleteLike);
router.post('/insertLike', insertLike);
router.post('/checkUserLike', checkUserLike);
router.post('/deleteBookmark', deleteBookmark);
router.post('/addBookmark', addBookmark);
router.post('/checkUserBookmark', checkUserBookmark);

router.post("/comment",postComment);
router.get("/getcomment/:post_id",getCommentsOfPost);

// Fetching trending hashtags
router.get("/trending/hashtags", getTrendingHashtags);
router.get('/hashtag/:hashtag_name',getPostsByHashtag);

export default router;
