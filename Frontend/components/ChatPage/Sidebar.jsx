import { Avatar } from "react-chat-engine-advanced";

const Sidebar = ({user}) => {

  return (
    <div style={{ textAlign: "center" }}>
      <Avatar
        className="sidebar-avatar"
        src={`http://localhost:8080/${user?.profile_path}`}
        username={user?.username}
        isOnline={true}
      />
    </div>
  );
};

export default Sidebar;
