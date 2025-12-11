import { getUserName } from "../../utils/auth";
import "../../Styles/TopNavbar.css";

function TopNavbar() {
  const username = getUserName();

  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="top-navbar">
      <h2 className="main-greeting">
        {greeting}, <span className="username">{username}</span> 
      </h2>
    </div>
  );
}

export default TopNavbar;
