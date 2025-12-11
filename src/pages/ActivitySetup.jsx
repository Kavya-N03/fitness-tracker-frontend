import { useState } from "react";
import { getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/ActivitySetup.css";

function ActivitySetUp() {
  const navigate = useNavigate();
  const token = getAccessToken();

  const [formData, setFormData] = useState({
    activity: "",
    duration: "",
    date: ""
  });

  const [msg, setMsg] = useState("");

  const activities = [
    { type: "walk", label: "Walking", icon: "🚶" },
    { type: "run", label: "Running", icon: "🏃" },
    { type: "cycle", label: "Cycling", icon: "🚴" },
    { type: "yoga", label: "Yoga", icon: "🧘" },
    { type: "swim", label: "Swimming", icon: "🏊" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleActivitySelect = (activityType) => {
    setFormData({
      ...formData,
      activity: activityType
    });
  };

  const handleActivitySave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/activities/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMsg("Error adding activity.");
      } else {
        setMsg("Activity added successfully.");
        navigate("/acts");
      }
    } catch (error) {
      console.log("Network error");
    }
  };

  const selectedActivity = activities.find(
    (act) => act.type === formData.activity
  );

  return (
    <div className="activity-container">

      <h2 className="activity-title">Record Today's Activity</h2>

      <p className="profile-reminder">
        Please complete your profile for accurate tracking.
        <button className="link-btn" onClick={() => navigate("/profilesetup")}>
          Go to Profile Setup
        </button>
      </p>

      {msg && <h3 className="activity-message">{msg}</h3>}

      <h3 className="section-title">Select Activity</h3>

      <div className="activity-list-vertical">
        {activities.map((act) => (
          <div
            key={act.type}
            className={`activity-card-vertical ${
              formData.activity === act.type ? "selected" : ""
            }`}
            onClick={() => handleActivitySelect(act.type)}
          >
            <div className="activity-icon-vertical">{act.icon}</div>
            <span className="activity-label-vertical">{act.label}</span>
          </div>
        ))}
      </div>

      {formData.activity && (
        <div className="activity-form-card">

          <h3 className="selected-text">
            You selected: {selectedActivity.icon} {selectedActivity.label}
          </h3>

          <form className="activity-form" onSubmit={handleActivitySave}>
            
            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="save-btn">
              Save Activity
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ActivitySetUp;
