"use client";
import valley from  '../assets/valley.jpeg';
import { useIsMobile } from "../functions/isMobile";
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import "./theme.css";
import Sidebar from "./Sidebar";
import MessageForm from "./MessageForm";
import UserSearch from "./UserSearch";
import ChatCard from "./ChatCard";
import ChatHeader from "./ChatHeader";
import { projectId } from "../functions/constants";

const ChatsPage = ({user}) => {

  const isMobile = useIsMobile(); 
  const username = user ? user.email : "";
  const secret = user && user.password_hash !== null ? user.password_hash : "";
  const chatProps = useMultiChatLogic(projectId, username, secret);
  console.log(chatProps)
  return (
    <div className='mx-auto overflow-x-hidden'>
    {
      chatProps && <div className="bg-white">
      <div className="bg-white">
        <div
           style={{
              width: "6vw",
              height: "100%",
              position: "absolute",
              top: "0px",
              left: "180px",
            }}
        >
          <div
            style={{
              width: isMobile ? "100vw" : "calc(100vw - 6vw)",
              position: "absolute",
              top: "0px",
              left: isMobile ? "0px" : "6vw",
              height: "100%", 
              overflowX: 'hidden' 
            }}
          >
            <MultiChatSocket {...chatProps} />

            <MultiChatWindow
                {...chatProps}
                renderChatForm={() => (
                  <UserSearch
                    username={chatProps.username}
                    secret={chatProps.secret}
                    onSelect={(chatId) => {
                      chatProps.onChatCardClick(chatId)
                    }}
                  />
                )}
                renderChatCard={(props) => {
                  return (
                    <ChatCard
                      {...props}
                      username={chatProps.username}
                      onChatCardClick={chatProps.onChatCardClick}
                      isActive={
                        props.chat !== undefined &&
                        chatProps.activeChatId === props.chat.id
                      }
                      chat={props.chat}
                    />
                  );
                }}
                renderChatHeader={(props) => {
                  return (
                    <ChatHeader
                      {...props}
                      chat={chatProps.chat}
                      username={chatProps.username}
                      secret={chatProps.secret}
                    />
                  );
                }}
                renderMessageForm={(props) => <MessageForm props={props} user={user} />}
                renderChatSettings={() => <div className="ce-empty-settings" />}
                style={{ height: "100%", width: "115%", backgroundColor: "white" }}
              />
          </div>
        </div>
      </div>
    </div>
    }
       

       </div>   
  );
};

export default ChatsPage;
