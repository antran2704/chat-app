import "./Sidebar.scss";
import { AiOutlineLogin } from "react-icons/ai";
import RoomList from "../RoomList/RoomList";
import { auth } from "../../../../firebase/configs";
import { AuthContext } from "../../../Context/AuthProvider";
import { useContext } from "react";
function Sidebar({onClick}) {
  const { displayName, photoURL } = useContext(AuthContext);

  function handleLogOut() {
    console.log("log out");
    window.location.pathname = "/login";
    auth.signOut();
  }
  return (
    <div className="side-bar">
      <div className="side-bar__header">
        <div className="side-bar__infor">
          {photoURL ? (
            <img src={photoURL} alt="" />
          ) : (
            <span className="side-bar__img">{displayName.charAt(0).toUpperCase()}</span>
          )}
          <p className="side-bar__name">{displayName}</p>
        </div>
        <button onClick={handleLogOut} className="side-bar__out">
          <AiOutlineLogin />
          Log Out
        </button>
        <AiOutlineLogin onClick={handleLogOut} className="side-bar__out-btn"/>
      </div>
      <RoomList onClick={onClick}/>
    </div>
  );
}

export default Sidebar;
