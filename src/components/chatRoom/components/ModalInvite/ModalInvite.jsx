import "./ModalInvite.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { db } from "../../../../firebase/configs";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContex } from "../../../Context/AppProvider";

function ModalInvite({ onClick, showModal }) {
  const { selectRoom } = useContext(AppContex);

  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState([]);
  const [showListUser, setShowListUSer] = useState(true);
  const [users, setUsers] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);

  function handleSearchText(e) {
    setSearch(e.target.value);
  }

  function handleSelectItem(e, user) {
    if (e.target.closest(".invite__item").classList.contains("active")) {
      e.target.closest(".invite__item").classList.toggle("active");
      selectItem.map((item, index) => {
        if (item == user.uid) {
          console.log(index);
          selectItem.splice(index, 1);
          setSelectItem(selectItem);
        }
      });
    } else {
      e.target.closest(".invite__item").classList.toggle("active");
      setSelectItem((prev) => [...prev, user.uid]);
    }
  }

  function handleAddmembers() {
    const roomRef = db.collection("rooms").doc(selectRoom.id);
    roomRef.update({
      members: [...selectRoom.members, ...selectItem],
    });
    setSearch("");
  }
  useEffect(() => {
    if (search && search.length > 0) {
      db.collection("users")
        .where("uid", "not-in", selectRoom.members)
        .get()
        .then((users) => {
          const documents = users.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setUsers(documents);
        });
    } else {
      setUsers([]);
    }
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (users.length > 0) {
        const result = users.filter((user) => {
          return user.displayName.toLowerCase().includes(search.toLowerCase());
        });
        setResultSearch(result);
      } else {
        setResultSearch([]);
      }
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [users]);

  return (
    <div className={`invite__modal ${showModal && "active"}`}>
      <div
        onClick={() => {
          onClick();
          setSearch("");
        }}
        className="invite__modal-layout-close"
      ></div>
      <div className="invite__modal-layout">
        <div className="invite__modal-header">
          <h3 className="invite__modal-title">Tạo phòng</h3>
          <AiOutlineClose
            onClick={() => {
              onClick();
              setSearch("");
            }}
            className="invite__modal-icon"
          />
        </div>
        <div className="invite__modal-content">
          <div className="invite__modal-item">
            <p className="invite__modal-item-title">Nhập tên người dùng</p>
            <input
              type="text"
              className="invite__modal-inp"
              placeholder="Nhập tên người dùng"
              name="name"
              value={search}
              onChange={(e) => {
                handleSearchText(e);
              }}
              onFocus={() => setShowListUSer(true)}
            />
            {resultSearch.length > 0 && showListUser && (
              <ul className="invite__list">
                <AiOutlineClose
                  onClick={() => setShowListUSer(false)}
                  className="invite__modal-close"
                />

                {resultSearch.map((user, index) => (
                  <li
                    onClick={(e) => {
                      handleSelectItem(e, user, index);
                    }}
                    key={user.id}
                    className="invite__item"
                  >
                    <img src={user.photoURL} alt="" />
                    <p className="invite__name">{user.displayName}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="invite__modal-footer">
          <button
            onClick={onClick}
            className="invite__modal-btn invite__modal-btn--cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddmembers();
              onClick();
            }}
            className="invite__modal-btn invite__modal-btn--ok"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalInvite;
