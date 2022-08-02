import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext, useMemo } from "react";
import { useFireStore } from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContex = createContext();

function AppProvider({ children }) {

  const { uid } = useContext(AuthContext);
  const [selectRoomId, setSelectRoomId] = useState("");
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFireStore("rooms", roomsCondition);

  const selectRoom = useMemo(
    
    () => rooms.find((room) => room.id === selectRoomId) || {},
    [rooms, selectRoomId]
  );
  const memberCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectRoom.members,
    };
  }, [selectRoom.members]);

  const members = useFireStore("users", memberCondition);
  return (
    <AppContex.Provider
      value={{ rooms, selectRoomId, setSelectRoomId, selectRoom, members }}
    >
      {children}
    </AppContex.Provider>
  );
}

export default AppProvider;
