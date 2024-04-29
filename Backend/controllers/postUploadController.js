import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./Uploads/posts")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})
export const uploadPostFiles = upload.single('file');

export const handleFileUploading  = async (req, res) => {
    const userId = req.params.userId; 
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        return res.status(201).json({path:req.file.path, message: 'File uploaded successfully' });

    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
