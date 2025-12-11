import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import "../Styles/Nutrition.css";

function Nutrition() {
  const token = getAccessToken();
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/meals/", {
        headers: { Authorization: "JWT " + token },
      });

      const data = await response.json();
      if (!response.ok) setError("Error fetching nutrition data");

      setMealData(data);
    } catch {
      setError("Network Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayMeals = mealData.filter((m) => m.date === today);

  const totals = todayMeals.reduce(
    (acc, item) => {
      acc.calories += item.total_calories || 0;
      acc.carbs += item.total_carbs || 0;
      acc.protein += item.total_protein || 0;
      acc.fat += item.total_fats || 0;
      return acc;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  const round = (n) => Number(n).toFixed(2);

  return (
    <div className="nutrition-wrapper">

      <h2 className="nutrition-title">Today's Nutrition Summary</h2>

      {error && <p className="nutrition-error">{error}</p>}

      {todayMeals.length === 0 ? (
        <p className="nutrition-no-data">No meal data found for today.</p>
      ) : (
        <>
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Calories</th>
                <th>Carbs (g)</th>
                <th>Protein (g)</th>
                <th>Fat (g)</th>
              </tr>
            </thead>

            <tbody>
              {todayMeals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.food}</td>
                  <td>{round(meal.total_calories)}</td>
                  <td>{round(meal.total_carbs)}</td>
                  <td>{round(meal.total_protein)}</td>
                  <td>{round(meal.total_fats)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="nutrition-totals">
            <h3>Total Nutrition for Today</h3>

            <div className="totals-simple">
              <p><strong>Total Calories:</strong> {round(totals.calories)} kcal</p>
              <p><strong>Total Carbs:</strong> {round(totals.carbs)} g</p>
              <p><strong>Total Protein:</strong> {round(totals.protein)} g</p>
              <p><strong>Total Fat:</strong> {round(totals.fat)} g</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Nutrition;
