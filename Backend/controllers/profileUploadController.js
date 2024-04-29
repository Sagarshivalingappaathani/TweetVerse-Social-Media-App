import multer from 'multer';
import { db } from "../database.js"; 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./Uploads/profile_photos")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})
export const uploadFile = upload.single('file');

export const handleFileUpload  = async (req, res) => {
    const userId = req.params.userId; 
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const updateQuery = `UPDATE Users SET profile_path = ? WHERE user_id = ?`;

        await db.query(updateQuery, [req.file.path, userId]);

        return res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


