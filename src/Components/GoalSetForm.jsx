import "../Styles/GoalForm.css"
function GoalSetForm({ handleSave, goalData, setGoalData }) {
    
    const handleChange = (e) => {
        setGoalData({
            ...goalData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSave}>
            <div className="goal-form-container">
                <h2>{goalData.id ? "Update Your Goal" : "Set Up Your Goal"}</h2>

                <div className="goal-form-group">
                    <label>Goal Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={goalData.title} 
                        onChange={handleChange} 
                        placeholder="Enter a descriptive title" 
                    />
                </div>

                <div className="goal-form-group">
                    <label>Goal Type</label>
                    <select 
                        name="goal" 
                        value={goalData.goal} 
                        onChange={handleChange}
                    >
                        <option value="">Select goal type</option>
                        <option value="gain">Gain Weight</option>
                        <option value="lose">Lose Weight</option>
                        <option value="fitness">Maintain Fitness</option>
                    </select>
                </div>

                <div className="goal-form-group">
                    <label>Status</label>
                    <select 
                        name="status" 
                        value={goalData.status} 
                        onChange={handleChange}
                    >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="goal-form-group">
                    <label>Starting Weight (kg)</label>
                    <input 
                        type="number"
                        step="0.1"
                        name="start_weight"
                        value={goalData.start_weight}
                        onChange={handleChange}
                        placeholder="Enter your starting weight"
                    />
                </div> 

               <div className="goal-form-group">
                    <label>Current Weight (kg)</label>
                    <input 
                        type="number"
                        step="0.1"
                        name="current_weight"
                        value={goalData.current_weight}
                        onChange={handleChange}
                        placeholder="Enter your current weight"
                    />
                </div>

                <div className="goal-form-group">
                    <label>Target Weight (kg)</label>
                    <input 
                        type="number"
                        step="0.1"
                        name="target_weight"
                        value={goalData.target_weight}
                        onChange={handleChange}
                        placeholder="Enter your target weight"
                    />
                </div> 

                <button type="submit" className="goal-submit-btn">
                    {goalData.id ? "Save Changes" : "Create Goal"}
                </button>
            </div>
        </form>
    );
}

export default GoalSetForm;
