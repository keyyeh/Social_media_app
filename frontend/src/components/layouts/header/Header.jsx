import Input from "../../common/Input";
import avatar from "../../../assets/images/avatar.jpg";
import logo from "../../../assets/images/logo.png";
import "./Header.scss";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

function Header({ children }) {
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
    if (!selectedItem) {
      localStorage.clear()
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand nav-logo" href="#">
            <img src={logo} alt="Logo" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <div className="box">
              <div className="box-item box-search">
                <Input />
              </div>
              <div className="box-item box-icon">
                <FaCartShopping className="icon" />
              </div>
              <div className="box-item">
                  <DropdownButton
                    id="dropdown-account-menu"
                    title={
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                      />
                    }
                    onSelect={handleSelect}
                    variant="link"
                    align="end"
                    className="facebook-dropdown"
                  >
                    <Dropdown.Item
                      eventKey="profile"
                      href="#/profile"
                      className="d-flex align-items-center"
                    >
                      <FaUser className="me-2" />
                      Hồ sơ
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="settings"
                      href="#/settings"
                      className="d-flex align-items-center"
                    >
                      <FaCog className="me-2" />
                      Cài đặt
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      eventKey
                      stocking="logout"
                      href="/"
                      className="d-flex align-items-center"
                    >
                      <FaSignOutAlt className="me-2" />
                      Đăng xuất
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          </div>
      </nav>
      <div className="page-content">
        <div className="children">{children}</div>
      </div>
    </>
  );
}

export default Header;
