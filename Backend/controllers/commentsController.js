import { db } from "../database.js";

export const postComment = async (req, res) => {
  try {
    const { postId,userId,content} = req.body;

    const insertPostQuery = `
      INSERT INTO Comments (post_id,user_id, content)
      VALUES (?, ?, ?)
    `;

    const result = await db.query(insertPostQuery, [postId,userId, content]);
    return res.status(201).json({ message: 'commented sucesfully' });
  } catch (error) {
    console.error('Error Creating Post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getCommentsOfPost = async (req, res) => {
  const postId = req.params.post_id;

  try {
    const getCommentsQuery = `
      SELECT * FROM Comments
      WHERE post_id = ?
      ORDER BY commented_at DESC;   
    `;

    const result = await db.query(getCommentsQuery,[postId]);
    const posts = result[0];
    
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error comments Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

