import { useFireStore } from "../../../hooks/useFireStore";
import { formatRelative } from "date-fns/esm";
import { useContext, useEffect, useMemo } from "react";
import { AppContex } from "../../../Context/AppProvider";
import { useRef } from "react";

function Messages() {
  const { selectRoom } = useContext(AppContex);
  const messageListRef = useRef();
  const messagesCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectRoom.id,
    };
  }, [selectRoom.id]);
  const messages = useFireStore("messages", messagesCondition);

  function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  }

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef.current) {
      console.log(messageListRef.current.scrollTop);
      console.log(messageListRef.current.scrollHeight);
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <div ref={messageListRef} className="chat__content">
      <div className="chat__content-wrap">
        {messages.map((item) => (
          <div key={item.id} className="chat__content-item">
            <div className="chat__content-infor">
              {item.photoURL ? (
                <img src={item.photoURL} alt="" className="chat__content-img" />
              ) : (
                <span className="side-bar__img">
                  {item.displayName.charAt(0).toUpperCase()}
                </span>
              )}
              <h3 className="chat__content-name">{item.displayName}</h3>
              <p className="chat__content-time">
                {formatDate(item.createdAt && item.createdAt.seconds)}
              </p>
            </div>
            <p className="chat__content-mes">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
