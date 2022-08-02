import { useContext, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { AppContex } from "../../../Context/AppProvider";
import "./RoomList.scss";
function RoomList({onClick}) {
  const {rooms ,setSelectRoomId} = useContext(AppContex);  

  const [showRoom, setShowRoom] = useState(false);
  function handleShowRoom() {
    setShowRoom(!showRoom);
  }

  function handleActive(e) {
    const items = document.querySelectorAll(".room__item");
    items.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  }

  return (
    <ul className="room__list">
      <div onClick={handleShowRoom} className="room__header">
        <IoIosArrowDown className={`room__icon ${showRoom ? "show" : ""}`} />
        danh sach cac phong
      </div>
      <div className={`room__wrap ${showRoom ? "show" : ""}`}>
        <div className="room__wrap-item"> 
          {rooms.map(function (room) {
            return (
              <li
                key={room.id}
                onClick={(e) => 
                  {
                    handleActive(e)
                    setSelectRoomId(room.id)
                  }}
                className={`room__item ${showRoom ? "show" : ""}`}
              >
                {room.name}
              </li>
            );
          })}
        </div>
        <button onClick={onClick} className={`room__btn ${showRoom ? "show" : ""}`}>
          <GoDiffAdded />
          Thêm phòng
        </button>
      </div>
    </ul>
  );
}

export default RoomList;
