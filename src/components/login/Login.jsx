import { useEffect } from "react";
import { AiOutlineFacebook, AiOutlineGooglePlus } from "react-icons/ai";
import firebase, { auth, db } from "../../firebase/configs";
import { addDocument } from "../../firebase/services";
import "./Login.scss";

const fbProvider = new firebase.auth.FacebookAuthProvider();
function Login() {
  async function handleLogin() {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    if (additionalUserInfo && additionalUserInfo.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
      });
    }
  }
  useEffect(() => {
    auth.signOut();
  }, []);
  return (
    <div className="login">
      <div className="login__wrap">
        <h1 className="login__header">Fun Chat</h1>
        <div className="login__content">
          <p className="login__title">Đăng nhập</p>
          <div className="login__btn-wrap">
            <button className="login__btn">
              <AiOutlineGooglePlus className="login__icon" />
              Google
            </button>
            <button onClick={handleLogin} className="login__btn">
              <AiOutlineFacebook className="login__icon" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
