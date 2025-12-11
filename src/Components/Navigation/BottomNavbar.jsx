import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaRunning, 
  FaUtensils, 
  FaAppleAlt, 
  FaUser, 
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import useLogout from "../../Components/useLogout";
import "../../Styles/BottomNavBar.css";

function BottomNavBar() {
  const location = useLocation();
  const hideRoutes = ["/","/login"];

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
    if(hideRoutes.includes(location.pathname)){
    return null;
  }

  return (
    <nav className="bottom-nav">
      <ul className="nav-list">

        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/activity" className="nav-link">
            <FaRunning className="nav-icon" />
            <span>Activity</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/meals" className="nav-link">
            <FaUtensils className="nav-icon" />
            <span>Meals</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/nutrition" className="nav-link">
            <FaAppleAlt className="nav-icon" />
            <span>Nutrition</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/profileinfo" className="nav-link">
            <FaUser className="nav-icon" />
            <span>Profile</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <div className="nav-link logout-link" onClick={handleLogout}>
            <IoMdLogOut className="nav-icon" />
            <span>Logout</span>
          </div>
        </li>

      </ul>
    </nav>
  );
}

export default BottomNavBar;
