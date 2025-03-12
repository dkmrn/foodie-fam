import { useState } from "react";
import { sendPost } from "../api/Posts";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../main.jsx";

export function CreatePost() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        date: "",
        time: "",
        // additionalInfo: "", //for now, backend does not have parameter for additional info
        userId: getUserId()
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        // console.log("Submitted Data:", { restaurant, address, date, time, additionalInfo });
        // console.log("Submitted Data:", formData);
        try {
            //send formData to backend
            const response = await sendPost(formData);
            console.log("Post Created Successfully:", response);
            navigate("/goToHomepage");

        } catch (error) {
            console.error("Failed to submit post:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Cook Up Your FoodieFam Feast!</h1>

            <div style={styles.formContainer}>
                <label style={styles.label}>Restaurant:</label>
                <input
                    type="text"
                    className="input-box"
                    style={styles.input}
                    placeholder="BCD"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitted}
                />

                <label style={styles.label}>Address:</label>
                <input
                    type="text"
                    className="input-box"
                    style={styles.input}
                    placeholder="123 Christmas Lane"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={isSubmitted}
                />

                <label style={styles.label}>Date:</label>
                <input
                    type="date"
                    className="input-box"
                    style={styles.input}
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    disabled={isSubmitted}
                />

                <label style={styles.label}>Time:</label>
                <input
                    type="time"
                    className="input-box"
                    style={styles.input}
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={isSubmitted}
                />

                <label style={styles.label}>Additional Info:</label>
                <textarea
                    type="text"
                    className="input-box"
                    style={styles.textarea}
                    name="additionalInfo"
                    placeholder="Any allergies? What dishes are you planning on ordering?"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    disabled={isSubmitted}
                />

                <button
                    className="createButton"
                    style={styles.button}
                    onClick={handleSubmit}
                    disabled={isSubmitted}
                >
                    {isSubmitted ? "Submitted" : "Submit Post"}
                </button>
            </div>
        </div>
    );
}



import beigebackground from "../assets/beigebackground.png";

// Styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4e9dc", // Soft beige background
        backgroundImage: `url(${beigebackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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

export default CreatePost;