import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function CreateAccount() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Username:", username);
        console.log("Submitted Password:", password);
        // You can add logic to send this data to your backend here
    };

    // So after creating use the return will be user id which will be used to create profile
    //const responseUser = await sendUser(formDataUser);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4"
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                textAlign: "center",
                width: "300px"
            }}>
                <h1 style={{ marginBottom: "20px" }}>Create Account</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px"
                        }}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        style={{
                            padding: "10px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "5px"
                        }}
                    />
                    <button type="submit" style={{
                        background: "#007BFF",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}
