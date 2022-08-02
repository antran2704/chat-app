import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { addDocument } from "../../../../firebase/services";
import { AuthContext } from "../../../Context/AuthProvider";
import "./Modal.scss";
function Modal({ onClick, showModal }) {
  const { uid } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  function handleAddDocument() {
    const name = document.querySelector("input[name = name]").value;
    const description = document.querySelector(
      "input[name = description]"
    ).value;
    addDocument("rooms", {
      name: name,
      description: description,
      members: [uid],
    });

    setName("");
    setDescription("");
  }

  return (
    <div className={`modal ${showModal && "active"}`}>
      <div
        onClick={() => {
          onClick();
          setName("");
          setDescription("");
        }}
        className="modal__layout-close"
      ></div>
      <div className="modal__layout">
        <div className="modal__header">
          <h3 className="modal__title">Tạo phòng</h3>
          <AiOutlineClose onClick={onClick} className="modal__icon" />
        </div>
        <div className="modal__content">
          <div className="modal__item">
            <p className="modal__item-title">Tên phòng</p>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="modal__inp"
              placeholder="Nhập tên phòng"
              name="name"
            />
          </div>
          <div className="modal__item">
            <p className="modal__item-title">Mô tả</p>
            <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              type="text"
              className="modal__inp"
              placeholder="Nhập mô tả"
              name="description"
            />
          </div>
        </div>
        <div className="modal__footer">
          <button
            onClick={() => {
              onClick();
              setName("");
              setDescription("");
            }}
            className="modal__btn modal__btn--cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddDocument();
              onClick();
            }}
            className="modal__btn modal__btn--ok"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
