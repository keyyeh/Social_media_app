import { Routes, Route, NavLink } from "react-router-dom";
import "./login.scss";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import LoginLayout from "../../../components/layouts/login/LoginLayout.jsx";
import RegisterLayout from "../../../components/layouts/login/RegisterLayout.jsx";
import { useState, useEffect } from "react";
import Alert from "../../../components/common/Alert.jsx";

function Login() {
  const [message, setMessage] = useState("");
  const [button, setButton] = useState("");

  const handleMessageFromRegister = (newMessage, typeButon) => {
    setMessage(newMessage);
    setButton(typeButon);
  };

  const handleCloseAlert = () => {
    setMessage("");
    setButton("");
  };

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        handleCloseAlert();
      }, 3000); // 3000ms = 3 giây
    }
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="login-page-wrap">
      <div className="content">
        <div className="login-content container">
          <Alert message={message} type={button} onClose={handleCloseAlert} />
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <FaUserFriends />
                Đăng nhập
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <MdOutlineFileDownload />
                Đăng ký
              </NavLink>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<LoginLayout />} />
            <Route
              path="/register"
              element={
                <RegisterLayout onMessageChange={handleMessageFromRegister} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Login;
