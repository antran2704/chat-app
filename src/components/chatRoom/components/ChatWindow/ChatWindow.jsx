import "./ChatWindow.scss";
import { IoIosInformationCircle } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useContext, useMemo } from "react";
import { AppContex } from "../../../Context/AppProvider";
import { addDocument } from "../../../../firebase/services";
import { useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Messages from "../Messages/Messages";
import { useRef } from "react";
function ChatWindow({ onClick }) {
  const { displayName, uid, photoURL } = useContext(AuthContext);
  const { selectRoom, members } = useContext(AppContex);
  const inputRef = useRef();
  const [messagesValue, setMessagesValue] = useState("");
  function handleAddMessages() {
    addDocument("messages", {
      text: messagesValue,
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      roomId: selectRoom.id,
    });
    setMessagesValue("");
    inputRef.current.focus();
  }
  function changeMessages(e) {
    setMessagesValue(e.target.value);
  }

  return (
    <div className="chat-window">
      {selectRoom.id ? (
        <>
          <div className="chat__header">
            <div className="chat__infor">
              <h2 className="chat__name">{selectRoom.name}</h2>
              <p className="chat__desc">{selectRoom.description}</p>
            </div>
            <div className="chat__members-wrap">
              <button onClick={onClick} className="chat__invite">
                <BsFillPersonPlusFill />
                Mời
              </button>
              <div className="chat__member">
                {members.slice(0, 2).map((member) => (
                  <Tippy key={member.id} content={member.displayName}>
                    {member.photoURL ? (
                      <img
                        key={member.id}
                        src={member.photoURL}
                        alt=""
                        className="chat__member-item"
                      />
                    ) : (
                      <span className="chat__member__img">
                        {member.displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </Tippy>
                ))}
                {members.length >= 3 && (
                  <Tippy
                    delay={[0, 200]}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                      <div className="box" tabIndex="-1" {...attrs}>
                        {members.slice(2).map((member) => (
                          <Tippy
                            key={member.id}
                            placement="bottom"
                            content={member.displayName}
                          >
                            {member.photoURL ? (
                              <img
                                key={member.id}
                                src={member.photoURL}
                                alt=""
                                className="chat__member-item"
                              />
                            ) : (
                              <span className="chat__member__img">
                                {member.displayName.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </Tippy>
                        ))}
                      </div>
                    )}
                  >
                    <span className="chat__member-item">
                      +{members.length - 2}
                    </span>
                  </Tippy>
                )}
              </div>
            </div>
          </div>

          <Messages />

          <div className="chat__footer">
            <div className="chat__footer-wrap">
              <input
                value={messagesValue}
                type="text"
                ref={inputRef}
                className="chat__footer-inp"
                placeholder="Nhập tin nhắn"
                onChange={(e) => changeMessages(e)}
              />
              <button onClick={handleAddMessages} className="chat__footer-btn">
                Gửi
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="chat-window__no-room">
          <IoIosInformationCircle className="chat-window__icon" />
          Hãy chọn phòng
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
