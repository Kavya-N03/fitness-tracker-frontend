import { useEffect, useState } from "react";
import TopNavbar from "../Components/Navigation/TopNavbar";
import DisplayActivity from "../Components/DisplayActivity";
import DisplayMeal from "../Components/DisplayMeal";
import DisplayGoal from "../Components/Navigation/DisplayGoal";
import "../Styles/Dashboard.css";

function DashBoard() {

    const [progress, setProgress] = useState(null);

    const fetchProgress = async () => {
        try {
            const response = await fetch(
                "https://fitness-tracker-api-5ibu.onrender.com/api/daily_progress/today/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem("access")}`,
                    },
                }
            );
            const data = await response.json();
            setProgress(data);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    return (
        <div className="dashboard-container">

            <TopNavbar />

            <div className="welcome-section">
                <h2 className="main-dashboard-title">
                    Track Your Fitness, Nutrition & Daily Progress
                </h2>
                <p className="welcome-subtext">
                    Monitor your activities, meals and calorie balance to stay consistent with your health goals.
                </p>
            </div>

            <div className="dashboard-content">
                <DisplayGoal/>

                {progress && (
                    <div className="card summary-card">
                        <h3>Today's Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <p className="label">Calories Consumed</p>
                                <p className="value">{progress.calories_consumed} kcal</p>
                            </div>
                            <div className="summary-item">
                                <p className="label">Calories Burned</p>
                                <p className="value">{progress.calories_burned} kcal</p>
                            </div>
                            <div className="summary-item">
                                <p className="label">
                                    {progress.net_calories < 0 ? "Calorie Deficit" : "Calorie Surplus"}
                                </p>
                                <p className="value">
                                    {progress.net_calories < 0
                                        ? Math.abs(progress.net_calories)
                                        : progress.net_calories} kcal
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="card">
                    <DisplayActivity />
                </div>

                <div className="card">
                    <DisplayMeal />
                </div>

            </div>


        </div>
    );
}

export default DashBoard;
