import {
  BrowserRouter as Router,
  Route,
  Routes,
  MemoryRouter,
} from "react-router-dom";
import "./App.scss";
import ChatRoom from "./components/chatRoom/ChatRoom";
import AppProvider from "./components/Context/AppProvider";
import AuthProvider from "./components/Context/AuthProvider";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
          </AppProvider>
        </AuthProvider>
      </MemoryRouter>
    </div>
  );
}

export default App;
