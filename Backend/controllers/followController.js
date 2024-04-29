// followerController.js
import { db } from "../database.js";

export const setFollowingUsers = async (req, res) => {
  try {
    const { storedUserId, followingId } = req.body;

    const checkFollowQuery = `
      SELECT * FROM Follows
      WHERE follower_id = ? AND following_id = ?
    `;

    const existingFollow = await db.query(checkFollowQuery, [storedUserId, followingId]);

    if (existingFollow[0].length > 0) {
      return res.status(400).json({ error: 'User is already being followed' });
    }

    const insertFollowQuery = `
      INSERT INTO Follows (follower_id, following_id)
      VALUES (?, ?)
    `;

    await db.query(insertFollowQuery, [storedUserId, followingId]);

    return res.status(201).json({ message: 'User followed successfully!' });
  } catch (error) {
    console.error('Error Following User:', error);
    return res.status(500).json({ error: 'Failed to follow user' });
  }
};

export const unsetFollowingUsers = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const deleteFollowQuery = `
      DELETE FROM Follows
      WHERE follower_id = ? AND following_id = ?
    `;

    await db.query(deleteFollowQuery, [followerId, followingId]);

    return res.status(200).json({ message: 'User unfollowed successfully!' });
  } catch (error) {
    console.error('Error Unfollowing User:', error);
    return res.status(500).json({ error: 'Failed to unfollow user' });
  }
};

export const getFollowers = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getFollowersQuery = `
      SELECT u.* FROM Users u
      JOIN Follows f ON u.user_id = f.follower_id
      WHERE f.following_id = ?;
    `;

    const result = await db.query(getFollowersQuery, [userId]);
    const followers = result[0];
    
    return res.status(200).json(followers);
  } catch (error) {
    console.error('Error Fetching Followers:', error);
    return res.status(500).json({ error: 'Failed to fetch followers' });
  }
};

export const getFollowing = async (req, res) => {
  const userId = req.params.userId;

  try {
    const getFollowingQuery = `
      SELECT u.* FROM Users u
      JOIN Follows f ON u.user_id = f.following_id
      WHERE f.follower_id = ?;
    `;

    const result = await db.query(getFollowingQuery, [userId]);
    const following = result[0];
    
    return res.status(200).json(following);
  } catch (error) {
    console.error('Error Fetching Following:', error);
    return res.status(500).json({ error: 'Failed to fetch following' });
  }
};


export const checkFollowerStatus = async (req, res) => {
  try {

    const { followerId, followingId } = req.body;

    // Use COUNT to get the number of rows matching the condition
    const checkFollowerStatusQuery = `
      SELECT COUNT(*) AS count FROM Follows
      WHERE follower_id = ? AND following_id = ?
    `;

    const result = await db.query(checkFollowerStatusQuery, [followerId, followingId]);

    // Check if the count is greater than 0 to determine if the user is a follower
    const isFollower = result[0][0].count > 0;

    return res.status(200).json({ isFollower });
  } catch (error) {
    console.error('Error Checking Follower Status:', error);
    return res.status(500).json({ error: 'Failed to check follower status' });
  }
};
