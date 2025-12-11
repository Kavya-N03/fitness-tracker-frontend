import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/DisplayMeals.css";

function DisplayMeal() {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState("");

  const mealTypes = [
    { type: "breakfast", label: "Breakfast", icon: "🍳" },
    { type: "lunch", label: "Lunch", icon: "🍛" },
    { type: "dinner", label: "Dinner", icon: "🍽️" },
    { type: "snacks", label: "Snacks", icon: "🥨" }
  ];

  const fetchMealData = async () => {
    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/meals/", {
        headers: { Authorization: "JWT " + token }
      });
      const data = await response.json();
      if (!response.ok) setError("Error in Displaying Meal data");
      setMealData(data);
    } catch {
      setError("Network error");
    }
  };

  useEffect(() => {
    fetchMealData();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayMeals = mealData.filter((td) => td.date === today);

  return (
    <div className="meal-wrapper">

      <h3 className="meal-title">Today's Meals</h3>

      {error && <div className="meal-error">{error}</div>}

      {todayMeals.length === 0 && (
        <div className="meal-no-data">No Meals Found</div>
      )}

      {todayMeals.length > 0 && (
        <div className="meal-table-container">
          <table className="meal-table">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Food</th>
                <th>Calories</th>
              </tr>
            </thead>

            <tbody>
              {todayMeals.map((meal, index) => {
                const mealInfo = mealTypes.find(
                  (m) => m.type === meal.meal_type
                );

                return (
                  <tr key={index}>
                    <td className="meal-type">
                      <span className="meal-icon">{mealInfo?.icon}</span>
                      {mealInfo?.label}
                    </td>
                    <td>{meal.food}</td>
                    <td>{meal.total_calories}</td>
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

export default DisplayMeal;
