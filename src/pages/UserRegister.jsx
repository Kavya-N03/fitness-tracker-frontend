import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/Register.css"
function UserRegister() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { username, email, password, password2 } = formData;

        if (!username.trim() || !email.trim() || !password.trim() || !password2.trim()) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (password !== password2) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.detail) {
                    setError(data.detail);
                } else {
                    const message = Object.entries(data)
                        .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
                        .join("\n");
                    setError(message);
                }
                return;
            }

            navigate("/login");

        } catch (error) {
            setError("Network Error! Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">

            <h2 className="register-title">Create Your Account</h2>

            {error && <h4 className="register-error">{error}</h4>}

            <form onSubmit={handleRegister} className="register-form">

                <div className="register-row">
                    <label>Enter Username :</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="register-row">
                    <label>Enter Email :</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="register-row">
                    <label>Enter Password :</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="register-row">
                    <label>Confirm Password :</label>
                    <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="register-btn">
                    {loading ? "Registering..." : "Register"}
                </button>

                <h3 className="register-login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </h3>

            </form>

        </div>
    );
}

export default UserRegister;
