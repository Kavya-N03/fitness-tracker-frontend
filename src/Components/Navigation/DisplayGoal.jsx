import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/auth";
import "../../Styles/DisplayGoal.css";

function DisplayGoal() {
  const token = getAccessToken();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);

  const GOAL_LABELS = {
    lose: "Lose Weight",
    gain: "Gain Weight",
    fitness: "Maintain Fitness",
  };

  const fetchGoal = async () => {
    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/goals/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
      });

      const data = await response.json();
      if (data.length > 0) setGoal(data[0]);
    } catch (error) {
      console.log("Error fetching goal:", error);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, []);

  return (
    <div className="goal-card">
      <h3>Your Goal Progress</h3>

      {!goal ? (
        <p className="no-goal">No goal set yet.</p>
      ) : (
        <>
          <div className="goal-row">
            <span className="goal-label">Goal Type</span>
            <strong className="goal-value">{GOAL_LABELS[goal.goal]}</strong>
          </div>

          <div className="goal-row">
            <span className="goal-label">Goal Title</span>
            <strong className="goal-value">{goal.title}</strong>
          </div>

          <div className="goal-row">
            <span className="goal-label">Current Weight</span>
            <strong className="goal-value">{goal.current_weight} kg</strong>
          </div>

          <div className="goal-row">
            <span className="goal-label">Target Weight</span>
            <strong className="goal-value">{goal.target_weight} kg</strong>
          </div>

          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${goal.progress_percentage}%` }}
            ></div>
          </div>

          <p className="progress-text"> 
            {goal.progress_percentage}% Completed
          </p>

          <button
            className="update-goal-btn"
            onClick={() => navigate("/goals")}
          >
            Update Goal
          </button>
        </>
      )}
    </div>
  );
}

export default DisplayGoal;
