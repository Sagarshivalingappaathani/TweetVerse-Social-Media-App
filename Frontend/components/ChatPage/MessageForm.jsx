"use client";
import { useContext, useState } from "react";
import { CaretUpFilled } from "@ant-design/icons";
import { nowTimeStamp } from "../functions/dates";
import { Context } from "../functions/context";

const MessageForm = ({props,user}) => {
  const [text, setText] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();

    if (text.trim().length === 0) {
      return;
    }
    if (!user || user.email === null) {
      return;
    }

    const message = {
      text: text,
      sender_username: user.email,
      created: nowTimeStamp(),
      custom_json: {},
      attachments: [],
    };

    setText("");

    props.onSubmit && props.onSubmit(message);
  };

  return (
    <form onSubmit={onSubmit} className="ce-custom-message-form">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type something..."
        className="ce-custom-message-input"
      />

      <button type="submit" className="ce-custom-send-button">
        <CaretUpFilled />
      </button>
    </form>
  );
};

export default MessageForm;
