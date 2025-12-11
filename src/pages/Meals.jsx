import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/Meals.css";

import {
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
  MdFastfood
} from "react-icons/md";

function Meals() {
  const navigate = useNavigate();
  const token = getAccessToken();

  const [mealData, setMealData] = useState({
    meal_type: "",
    food_id: "",
    quantity: "",
    date: ""
  });

  const [foods, setFoods] = useState([]);
  const [msg, setMsg] = useState("");

  const mealTypes = [
    { type: "breakfast", label: "Breakfast", icon: <MdFreeBreakfast /> },
    { type: "lunch", label: "Lunch", icon: <MdLunchDining /> },
    { type: "dinner", label: "Dinner", icon: <MdDinnerDining /> },
    { type: "snacks", label: "Snacks", icon: <MdFastfood /> }
  ];

  const handleMealTypeSelect = (type) => {
    setMealData((prev) => ({
      ...prev,
      meal_type: type
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMealData((prev) => ({
      ...prev,
      [name]: name === "food_id" ? Number(value) : value
    }));
  };

  const fetchFoodData = async () => {
    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/foods/", {
        headers: {
          Authorization: "JWT " + token
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setMsg("Error in fetching foods");
        return;
      }

      setFoods(data);
    } catch (error) {
      setMsg("Network error in fetching food data..");
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/meals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token
        },
        body: JSON.stringify(mealData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMsg(data.detail || "Error in adding meal");
        return;
      }

      setMsg("Meal added successfully");
      navigate("/displaymeals");
    } catch (error) {
      setMsg("Network error");
    }
  };

  const selectedMealInfo = mealTypes.find(
    (m) => m.type === mealData.meal_type
  );

  return (
    <div className="meal-container">

      <h2 className="meal-title">Enter Meal of the Day</h2>

      {msg && <h3 className="meal-message">{msg}</h3>}

      <h3 className="section-title">Select Meal Type</h3>

      <div className="meal-list-vertical">
        {mealTypes.map((meal) => (
          <div
            key={meal.type}
            className="meal-card"
            onClick={() => handleMealTypeSelect(meal.type)}
          >
            <div className="meal-icon">{meal.icon}</div>
            <span className="meal-label">{meal.label}</span>
          </div>
        ))}
      </div>

      {selectedMealInfo && (
        <div className="meal-form-card">
          <h3 className="selected-text">
            You selected: {selectedMealInfo.icon} {selectedMealInfo.label}
          </h3>

          <form className="meal-form" onSubmit={handleSave}>
            
            <div className="form-group">
              <label>Food</label>
              <select
                name="food_id"
                value={mealData.food_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Food</option>
                {foods.map((food) => (
                  <option key={food.id} value={food.id}>
                    {food.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={mealData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity in grams"
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={mealData.date}
                onChange={handleChange}
                required
              />
            </div>

            <button className="save-btn" type="submit">Save Meal</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Meals;
