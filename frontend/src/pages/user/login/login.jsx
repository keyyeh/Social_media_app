import "./login.scss";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState, useEffect } from "react";
import Alert from "../../../components/common/Alert.jsx";
import LoginLayout from "../../../components/layouts/login/LoginLayout.jsx";
import RegisterLayout from "../../../components/layouts/login/RegisterLayout.jsx";

function Login() {
  const [message, setMessage] = useState("");
  const [button, setButton] = useState("");
  const [isForm, setIsForm] = useState(true);

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
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message]);

  const [error, setError] = useState("");
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  //Hàm set trạng thái gọi form đăng nhập khi bằng true gọi form đăng ký bằng flase
  const handleForm = (bool) => {
    setIsForm(bool);
  }

  return (
    <div className="login-page-wrap">
      <div className="content">
        <div className="login-content container">
          <Alert message={message} type={button} onClose={handleCloseAlert} />
          <ul className="nav flex-column">
            <li className="nav-item">
              <button onClick={() => handleForm(true)} className="nav-link">
                <FaUserFriends />
                Đăng nhập
              </button>
            </li>
            <li className="nav-item">
              <button onClick={() =>handleForm(false)} className="nav-link">
                <MdOutlineFileDownload />
                Đăng ký
              </button>  
            </li>
          </ul>
           <div className="tab-content">
            {isForm ? (<LoginLayout/>):(<RegisterLayout onMessageChange={handleMessageFromRegister}/>)}
           </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
