import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import Sidebar from "./components/Sidebar/Sidebar";
import "./Chat.scss"
import Modal from "./components/Modal/Modal";
import ModalInvite from "./components/ModalInvite/ModalInvite";

function ChatRoom() {
    
    const [showModal,setShowModal] = useState(false)
    const [showModalInvite,setShowModalInvite] = useState(false)

    function handleModal() {
        setShowModal(!showModal)
    }

    function handleModalInvite() {
        setShowModalInvite(!showModalInvite)
    }
    return ( 
        <div className="chat">
            <Sidebar onClick = {handleModal}/>
            <ChatWindow onClick = {handleModalInvite}/>
            <Modal onClick = {handleModal} showModal = {showModal}/>
            <ModalInvite onClick = {handleModalInvite} showModal = {showModalInvite}/>
        </div>
     );
}

export default ChatRoom;