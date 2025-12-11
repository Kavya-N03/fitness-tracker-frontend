import { useState } from "react";
import { getAccessToken, getUserName } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { LuUser, LuRuler, LuWeight, LuVenetianMask } from "react-icons/lu";
import "../Styles/ProfileSetup.css";

function ProfileSetup() {
    const token = getAccessToken();
    const username = getUserName();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = {
            age: Number(profileData.age),
            gender: profileData.gender,
            height: Number(profileData.height),
            weight: Number(profileData.weight)
        };

        try {
            const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/users/me/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "JWT " + token,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError("Something went wrong!");
                return;
            }

            navigate("/goals");

        } catch (error) {
            setError("Network error while updating profile");
        }
    };

    return (
        <div className="profile-container">

            <h2 className="profile-title">Hey {username}, complete your profile</h2>

            <form className="profile-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label><LuUser className="icon" /> Age</label>
                    <input
                        type="number"
                        name="age"
                        value={profileData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label><LuVenetianMask className="icon" /> Gender</label>

                    <div className="gender-options">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={profileData.gender === "male"}
                                onChange={handleChange}
                                required
                            />
                            Male
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={profileData.gender === "female"}
                                onChange={handleChange}
                                required
                            />
                            Female
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={profileData.gender === "other"}
                                onChange={handleChange}
                                required
                            />
                            Other
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label><LuRuler className="icon" /> Enter your Height</label>
                    <input
                        type="number"
                        name="height"
                        value={profileData.height}
                        onChange={handleChange}
                        placeholder="Height in cm"
                        required
                    />
                </div>

                <div className="form-group">
                    <label><LuWeight className="icon" /> Enter your Weight</label>
                    <input
                        type="number"
                        name="weight"
                        value={profileData.weight}
                        onChange={handleChange}
                        placeholder="Weight in kg"
                        required
                    />
                </div>

                {error && <p className="profile-error">{error}</p>}

                <button className="profile-btn" type="submit">
                    Save Profile
                </button>

            </form>
        </div>
    );
}

export default ProfileSetup;
