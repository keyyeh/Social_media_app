import { Routes, Route, NavLink} from "react-router-dom";
import "./login.scss";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import LoginLayout from "../../../components/layouts/login/LoginLayout.jsx";
import RegisterLayout from "../../../components/layouts/login/RegisterLayout.jsx";
function Login() {
  return (
    <div className="login-page-wrap">
      <div className="content">
        <div className="login-content container">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <FaUserFriends/>
                Đăng nhập
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <MdOutlineFileDownload/>
                Đăng ký
              </NavLink>
            </li>
          </ul>
         <Routes>
            <Route path="/" element={<LoginLayout />}/>
            <Route path="/register" element={<RegisterLayout />}/>
         </Routes>
        </div>
      </div>
    </div>
  );
}

export default Login;
