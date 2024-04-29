import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import routes from "./routes/routes.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(express.static('Uploads'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the directory containing your static files (e.g., images)
const staticProfileFilesDirectory = join(__dirname, 'Uploads', 'profile_photos');
const staticPostsFilesDirectory = join(__dirname, 'Uploads', 'posts');

// Serve static files from the specified directory
app.use('/uploads/profile_photos', express.static(staticProfileFilesDirectory));
app.use('/uploads/posts', express.static(staticPostsFilesDirectory));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle chat messages
    socket.on('chat message', (message) => {
        io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
