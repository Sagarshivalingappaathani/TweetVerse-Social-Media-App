import { db } from "../database.js";

export const deleteLike = async (req, res) => {
    try {
      const { storedUserId, postId } = req.body;
      
      // delete like from likes table
      const deleteLikeQuery = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`;
  
      const result = await db.query(deleteLikeQuery, [storedUserId, postId]);
      
      return res.status(201).json({ message: 'deleted successfully' });
   
    } catch (error) {
      console.error('Error deleting like:', error);
      return res.status(500).json({ error: 'Failed to delete like ' });
    }
};

export const insertLike = async (req, res) => {
  console.log(req.body)
    try {
      const { storedUserId, postId } = req.body;
   
      const insertLikeQuery = `INSERT INTO Likes(user_id, post_id) VALUES(?, ?)`;
  
      const result = await db.query(insertLikeQuery, [storedUserId, postId]);
      return res.status(201).json({ message: 'Inserted successfully' });
   
    } catch (error) {
      console.error('Error liking Post:', error);
      return res.status(500).json({ error: 'Failed to like post' });
    }
};
  
export const checkUserLike = async (req, res) => {
    try {
      const { storedUserId, postId } = req.body;
      
      const checkUserLikeLikeQuery = ` 
      SELECT 
      COUNT(*) AS like_count, 
      (CASE WHEN EXISTS (SELECT 1 FROM Likes WHERE user_id = ? AND post_id = ?) THEN 1 ELSE 0 END) AS user_liked
      FROM Likes 
      WHERE post_id = ? `;
  
      const [result] = await db.query(checkUserLikeLikeQuery, [storedUserId, postId, postId]);
   
      return res.status(201).json({result});
   
    } catch (error) {
      console.error('Error checking like:', error);
      return res.status(500).json({ error: 'Failed to check like ' });
    }
};

export const deleteBookmark = async (req, res) => {
  try {
    const { storedUserId, postId } = req.body;
    
    const deleteBookmarkQuery = `DELETE FROM Bookmarks WHERE user_id = ? AND post_id = ?`;

    const result = await db.query(deleteBookmarkQuery, [storedUserId, postId]);
    
    return res.status(201).json({ message: 'deleted successfully' });
 
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return res.status(500).json({ error: 'Failed to delete bookmark ' });
  }
};

export const addBookmark = async (req, res) => {
  try {
    const { storedUserId, postId } = req.body;
    
 
    const addBookmarkQuery = `INSERT INTO Bookmarks(user_id, post_id) VALUES(?, ?)`;

    const result = await db.query(addBookmarkQuery, [storedUserId, postId]);
    
    return res.status(201).json({ message: 'added successfully' });
 
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return res.status(500).json({ error: 'Failed to add bookmark ' });
  }
};

export const checkUserBookmark = async (req, res) => {
  try {
    const { storedUserId, postId } = req.body;
    
    const checkUserBookmarkQuery = ` 
    SELECT *
    FROM Bookmarks 
    WHERE user_id = ? AND post_id = ? `;

    const [result] = await db.query(checkUserBookmarkQuery, [storedUserId, postId]);
    
    return res.status(201).json({result});
 
  } catch (error) {
    console.error('Error checking like:', error);
    return res.status(500).json({ error: 'Failed to check like ' });
  }
};

