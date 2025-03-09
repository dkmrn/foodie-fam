import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendUser } from "../api/Users.js";
import { sendProfile } from "../api/Profiles.js";
import { setUserId } from "../main.jsx";

//ERRRO I MIGHT WANT TO FIX AT BOTTOM

export function CreateAccount() {
    const navigate = useNavigate(); //need this so we can navigate back to log in page after hitting submit

    const [formDataUser, setFormDataUser] = useState({
        email: "",
        password: ""
    });

    const [formDataProfile, setFormDataProfile] = useState({
        userId: "",
        name: "",
        location: "",
        bio: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["email", "password"].includes(name)) {
            setFormDataUser((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormDataProfile((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsSubmitted(true);
        console.log("Submitting user:", formDataUser);

        try {
            // Create user
            const responseUser = await sendUser(formDataUser);
            console.log("User created successfully:", responseUser);

            if (!responseUser || !responseUser.insertedId) {
                throw new Error("Invalid user response. User ID not found.");
            }

            // Update formDataProfile with the new userId
            const userId = responseUser.insertedId;

            const updatedProfileData = { 
                ...formDataProfile, 
                userId 
            };

            // Update main to have the userId
            setUserId(userId);

            // Create profile
            const responseProfile = await sendProfile(updatedProfileData);

            console.log("Received User ID:", userId);
            console.log("Submitting profile:", updatedProfileData);
            console.log("Profile Created Successfully, Profile ID:", responseProfile);

            navigate("/goToHomepage"); //go back to log in after creating an account
        } catch (error) {
            console.error("Failed to submit profile:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Create Your Account</h1>

            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <label style={styles.label}>Email:</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formDataUser.email} 
                        onChange={handleChange}  
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Password:</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formDataUser.password} 
                        onChange={handleChange}  
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Name:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formDataProfile.name} 
                        onChange={handleChange}  
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Location:</label>
                    <input 
                        type="text" 
                        name="location"
                        value={formDataProfile.location} 
                        onChange={handleChange}  
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Bio:</label>
                    <textarea 
                        name="bio"
                        value={formDataProfile.bio} 
                        onChange={handleChange}  
                        required
                        style={styles.textarea}
                    />

                    <button type="submit" style={styles.button} disabled={isSubmitted}>
                        {isSubmitted ? "Submitted" : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Styles
import beigebackground from "../assets/beigebackground.png";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4e9dc", // Soft beige background
        backgroundImage: `url(${beigebackground})`,
        fontFamily: "'Arial', sans-serif",
    },
    heading: {
        fontSize: "28px",
        color: "#d66b4d", // Coral color
        marginBottom: "20px",
    },
    formContainer: {
        background: "#fffaf2", // Light beige box
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "350px",
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "16px",
        color: "#5a7d5a", // Soft green
        marginBottom: "8px",
        textAlign: "left",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "2px solid #d9c2a3", // Soft beige border
        borderRadius: "8px",
        fontSize: "16px",
    },
    textarea: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "2px solid #d9c2a3",
        borderRadius: "8px",
        fontSize: "16px",
        minHeight: "80px",
    },
    button: {
        backgroundColor: "#5a7d5a", // Soft green button
        color: "white",
        fontSize: "16px",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
        transition: "background 0.3s",
    },
};

export default CreateAccount;