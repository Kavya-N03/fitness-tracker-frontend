import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/DisplayActivity.css";

function DisplayActivity() {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [activityData, setActivityData] = useState([]);
  const [error, setError] = useState("");

  const activities = [
    { type: "walk", label: "Walking", icon: "🚶" },
    { type: "run", label: "Running", icon: "🏃" },
    { type: "cycle", label: "Cycling", icon: "🚴" },
    { type: "yoga", label: "Yoga", icon: "🧘" },
    { type: "swim", label: "Swimming", icon: "🏊" }
  ];

  const fetchActivityData = async () => {
    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/activities/", {
        headers: { Authorization: "JWT " + token }
      });

      const data = await response.json();

      if (!response.ok) setError("Error in fetching Activity Data");
      setActivityData(data);

    } catch {
      setError("Network error.");
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayActivity = activityData.filter((td) => td.date === today);

  return (
    <div className="activity-wrapper">

      <h3 className="activity-title">Today's Activity</h3>

      {error && <div className="error-box">{error}</div>}

      {todayActivity.length === 0 && (
        <div className="no-data">No Activity Found</div>
      )}

      {todayActivity.length > 0 && (
        <div className="table-container">
          <table className="activity-table">

            <thead>
              <tr>
                <th>Activity</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>

            <tbody>
              {todayActivity.map((item, index) => {
                const activityInfo = activities.find(
                  (a) => a.type === item.activity
                );

                return (
                  <tr key={index}>
                    <td className="act-label">
                      <span className="icon">{activityInfo?.icon}</span>
                      {activityInfo?.label}
                    </td>
                    <td>{item.duration}</td>
                    <td>{item.calories_burned}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default DisplayActivity;
