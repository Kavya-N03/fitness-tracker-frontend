import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css"
function UserLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.detail) {
                    setError(data.detail);
                } else {
                    setError("Invalid username or password");
                }
                setLoading(false);
                return;
            }

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("username", formData.username);

            navigate("/profilesetup");

        } catch (error) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login Now</h2>

            {error && <h4 className="login-error">{error}</h4>}

            <form onSubmit={handleLogin} className="login-form">

                <div className="login-row">
                    <label>Username :</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />
                </div>

                <div className="login-row">
                    <label>Password :</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                </div>

                <button type="submit" className="login-btn">
                    {loading ? "Logging In..." : "Login"}
                </button>

                <h3 className="login-register-link">
                    Don't have an account? <Link to="/">Register</Link>
                </h3>

            </form>
        </div>
    );
}

export default UserLogin;
