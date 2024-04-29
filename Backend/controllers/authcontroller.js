import { db } from "../database.js"; 

export const loginUser  = async (req, res) => {
    
    const { email, password} = req.body;

    try {
        
        const getUserQuery = `SELECT * FROM Users WHERE email = ?`;
        const userData = await db.query(getUserQuery, [email]);
        if (userData[0].length !== 0) {
            const user = userData[0][0];
            
            if (user.password_hash === password) {
                res.status(201).json({ user: user,message: 'Login successful!' });
            } else {
               
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } else {
           
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const signupUser  = async (req, res) => {
    try {
        
        const { displayname, username, email, dob, bio, password} = req.body;
      
        const insertUserQuery = `INSERT INTO Users (displayname, username, email, dob, bio, password_hash)
        VALUES (?, ?, ?, ?, ?, ?)`;

        const result = await db.query(insertUserQuery, [displayname, username, email, dob, bio, password]);
      
        if (result[0].affectedRows === 1) {
            res.status(201).json({ message: 'User registered successfully!' });
        } else {
            res.status(500).json({ error: 'Failed to register user' });
        }
    } catch (error) {
        console.error('Error Registering User:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}


