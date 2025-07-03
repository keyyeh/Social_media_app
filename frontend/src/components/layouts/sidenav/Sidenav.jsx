import "./Sidenav.scss";
import { MdOutlineFeed } from "react-icons/md";
import { RiTimelineView } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
function Sidenav({ children }) {
  return (
    <>
      <div className="sidenav">
        <div className="sidebar-toggle">
          <button className="toggle-btn toggler-open">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <ul className="side-menu">
            <li><a href="#" className="menu-link"><MdOutlineFeed/></a></li>
            <li><a href="#" className="menu-link"><RiTimelineView/></a></li>
            <li><a href="#" className="menu-link"><HiUserGroup/></a></li>
            <li><a href="#" className="menu-link"><FaUserFriends/></a></li>
            <li><a href="#" className="menu-link"><FaCartShopping/></a></li>
        </ul>
      </div>
      {children}
    </>
  );
}

export default Sidenav;
