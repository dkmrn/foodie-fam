import { useState } from "react";

export function CreateAccount() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

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
                [name]: value
            }));
        }
    };

    
    const handleSubmit = async () => {
        try {
            const responseUser = await sendUser(formDataUser);
            console.log("User Created Successfully, User ID:", responseUser);
            setFormDataUser({userId: responseUser});
        } catch (error) {
            console.error("Failed to submit profile:", error);
        }
        try {
            const responseProfile = await sendProfile(formDataProfile);
            console.log("Profile Created Successfully, Profile ID:", responseProfile);
        } catch (error) {
            console.error("Failed to submit profile:", error);
        }
    };
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
                        placeholder="Email" 
                        name="email"
                        value={formDataUser.email} 
                        onChange={handleChange}  
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
                        name="password"
                        value={formDataUser.password} 
                        onChange={handleChange}  
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
