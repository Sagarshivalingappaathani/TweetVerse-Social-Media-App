// getFollowers.js
import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const followUser = async (storedUserId, followingId) => {

  console.log("function is called = followUser");
  console.log(storedUserId, " : ", followingId);
  try {
    const response = await axios.post(`${BASE_URL}/setFollowingUsers`, { storedUserId, followingId });

    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      throw new Error(`Failed to follow user: ${response.status}`);
    }
  } catch (error) {
    console.error('Error following user:', error);
    throw new Error('Failed to follow user');
  }
};

export const unfollowUser = async (followerId, followingId) => {

  console.log("function is called = unfollowUser");

  try {
    const response = await axios.post(`${BASE_URL}/unsetFollowingUsers`, { followerId, followingId });

    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      throw new Error(`Failed to unfollow user: ${response.status}`);
    }
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw new Error('Failed to unfollow user');
  }
};

export const checkIfFollowing = async (followerId, followingId) => {
  try {
    const response = await axios.post(`${BASE_URL}/checkFollowerStatus`, { followerId, followingId });

    if (response.status >= 200 && response.status < 300) {
      const result = response.data;
      return result.isFollower;
    } else {
      throw new Error(`Failed to check follow status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error checking follow status:', error);
    throw new Error('Failed to check follow status');
  }
};


export const getFollowers = async (userId) => {
  const response = await fetch(`${BASE_URL}/getFollowers/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch followers');
  }

  const followers = await response.json();
  return followers;
};

export const getFollowing = async (userId) => {
  const response = await fetch(`${BASE_URL}/getFollowing/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch following');
  }

  const following = await response.json();
  return following;
};
