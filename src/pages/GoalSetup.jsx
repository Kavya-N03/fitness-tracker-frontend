import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";
import GoalSetForm from "../Components/GoalSetForm";
import "../Styles/GoalSetup.css";

function GoalSetup() {
    const token = getAccessToken();
    const navigate = useNavigate();

    const [goalData, setGoalData] = useState({
        title: "",
        goal: "",
        status: "",
        start_weight: "",
        current_weight: "",
        target_weight: "",
    });

    const [hasGoal, setHasGoal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [msg, setMsg] = useState("");

    const GOAL_LABELS = {
        lose: "Lose Weight",
        gain: "Gain Weight",
        fitness: "Maintain Fitness",
    };

    const STATUS_LABELS = {
        active: "Active",
        completed: "Completed",
        paused: "Paused",
    };

    const fetchGoalData = async () => {
        try {
            const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/goals/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "JWT " + token,
                },
            });

            const data = await response.json();

            if (data.length > 0) {
                setGoalData(data[0]);
                setHasGoal(true);
            } else {
                setHasGoal(false);
            }
        } catch (error) {
            setMsg("Error fetching goal data");
        }
    };

    useEffect(() => {
        fetchGoalData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let url = "https://fitness-tracker-api-5ibu.onrender.com/api/goals/";
            let method = "POST";

            if (hasGoal) {
                url = `https://fitness-tracker-api-5ibu.onrender.com/api/goals/${goalData.id}/`;
                method = "PATCH";
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "JWT " + token,
                },
                body: JSON.stringify(goalData),
            });

            const data = await response.json();

            if (!response.ok) {
                setMsg("Error saving goal");
                console.log("ERROR:",data)
                return;
            }

            setMsg("Goal saved successfully!");
            await fetchGoalData();
            setShowForm(false);
            navigate("/goals");
        } catch (error) {
            console.log("Network error:", error);
        }
    };

    return (
        <div className="goal-container">
            {msg && <h4 className="goal-message">{msg}</h4>}

            {hasGoal && !showForm && (
                <div className="goal-card">
                    <h1 className="goal-title">Your Goal</h1>

                    <div className="goal-info">
                        <div className="goal-row">
                            <span>Title</span>
                            <strong>{goalData.title}</strong>
                        </div>

                        <div className="goal-row">
                            <span>Status</span>
                            <strong>{STATUS_LABELS[goalData.status]}</strong>
                        </div>

                        <div className="goal-row">
                            <span>Goal</span>
                            <strong>{GOAL_LABELS[goalData.goal]}</strong>
                        </div>

                        <div className="goal-row">
                            <span>Starting Weight</span>
                            <strong>{goalData.start_weight}</strong>
                        </div>

                        <div className="goal-row">
                            <span>Current Weight</span>
                            <strong>{goalData.current_weight}</strong>
                        </div>

                        <div className="goal-row">
                            <span>Target Weight</span>
                            <strong>{goalData.target_weight}</strong>
                        </div>

                        <div className="goal-row">
                            <span>Progress</span>
                            <strong>{goalData.progress_percentage} %</strong>
                        </div>
                    </div>

                    <button className="goal-btn" onClick={() => setShowForm(true)}>
                        Edit Goal
                    </button>
                </div>
            )}

            {!hasGoal && !showForm && (
                <div className="goal-card">
                    <h3 className="goal-subtext">Please set your goal to continue</h3>
                    <button className="goal-btn" onClick={() => setShowForm(true)}>
                        Set Goal
                    </button>
                </div>
            )}

            {showForm && (
                <GoalSetForm
                    handleSave={handleSave}
                    setGoalData={setGoalData}
                    goalData={goalData}
                />
            )}
        </div>
    );
}

export default GoalSetup;
