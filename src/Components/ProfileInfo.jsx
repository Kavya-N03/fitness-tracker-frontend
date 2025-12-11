import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/ProfileInfo.css";

function ProfileInfo() {
    const navigate = useNavigate();
    const token = getAccessToken();

    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState("");

    const GENDER_LABEL = {
        male: "Male",
        female: "Female",
        other: "Other",
    };

    const classifyBMI = (bmi)=>{
        if(!bmi) return "";
        const value = parseFloat(bmi);
        if(value<18.5) return "Underweight";
        if(value<24.9) return "Normal";
        if(value<29.9) return "Overweight";
        return "Obese";
    };
    const bmiStatus = classifyBMI(profileData.bmi)

    const getProfile = async () => {
        try {
            const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/users/me/", {
                headers: {
                    Authorization: "JWT " + token,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError("Unable to load your profile information.");
                return;
            }

            setProfileData(data);
        } catch (err) {
            setError("Network error while fetching your profile.");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="profile-info-container">

            <h2 className="profile-heading">Your Profile Overview</h2>
            <p className="profile-subtext">
                Keep your information accurate to receive better fitness insights.
            </p>

            {error && <p className="error-text">{error}</p>}

            <div className="profile-card">
                <p><strong>Age:</strong> {profileData.age}</p>
                <p><strong>Gender:</strong> {GENDER_LABEL[profileData.gender]}</p>
                <p><strong>Height:</strong> {profileData.height} cm</p>
                <p><strong>Weight:</strong> {profileData.weight} kg</p>
                <p><strong>BMI:</strong> {profileData.bmi} ({bmiStatus}) </p>
                <small className="bmi-note">
                BMI (Body Mass Index) is a measure of body fat based on height and weight.
                </small>

            </div>

            <p className="update-text">
                Want to update your personal details?  
                Click the button below to edit your profile information.
            </p>

            <button className="update-btn" onClick={() => navigate("/profilesetup")}>
                Update Profile
            </button>
        </div>
    );
}

export default ProfileInfo;
