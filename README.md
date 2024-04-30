## This is a full stack Web Project focusing DBMS

### Description
This website is a social media platform that resembles Twitter, developed using Next.js, Express.js, and MySQL, offering a robust social media experience. Users can register, log in securely, and engage with various features including posting content (text, images, or videos), interacting with others' posts through likes and comments, managing their profiles, and exploring trending topics via hashtags just like the twitter. Additionally, users can follow each other, and follower/following counts are displayed on user profiles.  File upload functionality for photos and images is managed using the Multer library.

### Website Screenshots
- Home Page 
![](Screenshots/home.png)

- User Profile Page
![](Screenshots/profile.png)

- Creating Post
![](Screenshots/createpost.png)

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- MySQL
- Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/TweetHub.git 
2. ```bash
   cd Backend   
   npm install
   mysql -u <username> -p -e "source schema.sql"
   npm run dev 
3. ```bash
   cd Frontend  
   npm install
   npm run dev
