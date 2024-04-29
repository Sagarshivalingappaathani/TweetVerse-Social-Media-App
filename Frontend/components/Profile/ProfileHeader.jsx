import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import EditProfile from "./EditProfile";
import Modal from './ModelList'; 
import { followUser, unfollowUser, checkIfFollowing, getFollowers, getFollowing } from "../../hooks/getFollowers";

const ProfileHeader = ({ userData, currentUserId, updateOfUserDetails }) => {
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const result = await checkIfFollowing(currentUserId, userData?.user.user_id);
        setIsFollowing(result ? "Following" : "Not Following");
      } catch (error) {
        console.error('Error checking follow status:', error);
        setIsFollowing(null);
      }
    };

    const fetchFollowersAndFollowing = async () => {
      try {
        const followersData = await getFollowers(userData?.user.user_id);
        const followingData = await getFollowing(userData?.user.user_id);
        setFollowers(followersData);
        setFollowing(followingData);
      } catch (error) {
        console.error('Error fetching followers and following:', error);
      }
    };

    if (userData) {
      setUserId(userData.user.user_id);
      checkFollowingStatus();
      fetchFollowersAndFollowing();
    }
  }, [currentUserId, userData?.user.user_id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openFollowersModal = () => {
    setShowFollowers(true);
  };

  const openFollowingModal = () => {
    setShowFollowing(true);
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing === "Following") {
        await unfollowUser(currentUserId, userData?.user.user_id);
      } else {
        await followUser(currentUserId, userData?.user.user_id);
      }

      setIsFollowing((prevIsFollowing) => (prevIsFollowing === "Following" ? "Not Following" : "Following"));
      updateOfUserDetails();
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  const profileAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div
      style={profileAnimation}
      className="mx-auto mt-4 p-6 bg-gradient-to-r from-white to-gray-100 text-gray-800 flex-shrink-0 rounded-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={`http://localhost:8080/${userData?.user.profile_path}`}
            alt="Profile Picture"
            className="w-16 h-16 rounded-full border-4 border-white mr-4 shadow-md"
          />
          <div className="flex flex-col">
            <h2 className="text-3xl font-extrabold">{userData?.user.displayname}</h2>
            <span className="text-base font-semibold">{userData?.user.username}</span>
          </div>
        </div>
        {currentUserId === userData?.user.user_id ? (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition-all duration-300"
            onClick={openModal}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className={`bg-${isFollowing === "Following" ? "green-500" : "pink-500"} hover:bg-${isFollowing === "Following" ? "gray-500" : "pink-600"} text-white px-4 py-2 rounded-md transition-all duration-300 mr-2`}
              onClick={handleFollowToggle}
            >
              {isFollowing === "Following" ? "Following" : "Follow"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between bg-gradient-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <span className="text-xl font-bold text-purple-600">{userData?.posts[0]?.length}</span>
          <span className="ml-2 text-gray-600">Posts</span>
        </div>
        <div className="flex items-center">
          <span
            className={`text-xl font-bold cursor-pointer text-blue-600 hover:text-blue-700 transition-all duration-300`}
            onClick={openFollowersModal}
          >
            {userData?.followers[0]?.length}
            <span className="ml-2 text-gray-600">Followers</span>
          </span>
        </div>
        <div className="flex items-center">
          <span
            className={`text-xl font-bold cursor-pointer text-pink-600 hover:text-pink-700 transition-all duration-300`}
            onClick={openFollowingModal}
          >
            {userData?.following[0]?.length}
            <span className="ml-2 text-gray-600">Following</span>
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className='mt-6'>
          <EditProfile isOpen={isModalOpen} onClose={closeModal} userData={userData} updateOfUserDetails= {updateOfUserDetails} />
        </div>
      )}

      {showFollowers && (
        <Modal isOpen={showFollowers} onClose={() => setShowFollowers(false)} listType="Followers" listData={followers} />
      )}

      {showFollowing && (
        <Modal isOpen={showFollowing} onClose={() => setShowFollowing(false)} listType="Following" listData={following} />
      )}
    </animated.div>
  );
};

export default ProfileHeader;
