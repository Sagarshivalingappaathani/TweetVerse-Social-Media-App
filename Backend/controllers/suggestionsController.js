import { db } from "../database.js";


export const getUserSuggestions = async (req, res) => {
    const userId = req.params.userId; 
    try {
      const getSuggestionsQuery = `SELECT user_id, displayname, profile_path 
      FROM Users 
      WHERE user_id <> ?
      AND user_id NOT IN (
          SELECT following_id 
          FROM Follows 
          WHERE follower_id = ? 
      ) 
      LIMIT 6`;
      const [followerData] = await db.query(getSuggestionsQuery, [userId, userId])
      return res.status(201).json({ followerData });
    } catch(error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
} 
  
  
export const setFollowingUsers = async (req, res) => {

    const userId = req.body.userId;
    const followingId = req.body.followingId;
    try {
      const query = `INSERT INTO Follows  VALUES(?, ?)`;
      const response = await db.query(query, [userId, followingId]);
      return res.status(201).json({ message: "Successfully followed user." });
    } catch(error) {
      console.error("Error inserting into database:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
}

export const getTrendingHashtags = async (req, res) => {

    try {
      const query = `SELECT hashTag_name, COUNT(*) AS hashtag_count
      FROM HashTag
      GROUP BY hashTag_name
      ORDER BY hashtag_count DESC
      LIMIT 3`;
      const [hashtagData] = await db.query(query);
      return res.status(201).json({hashtagData});
    } catch(error) {
      console.error("Error getting Trending hshtags:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
}