import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './createStyle.css';
import { sendUser } from "../api/sendUser.js";
import { sendProfile } from "../api/sendProfile.js";

//ERRRO I MIGHT WANT TO FIX AT BOTTOM

export function CreateAccount() {
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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Create user
            const responseUser = await sendUser(formDataUser);
            console.log("User Created Successfully, User ID:", responseUser);

            // Update formDataProfile with the new userId
            let userId = responseUser.insertedId;
            setFormDataProfile({userId: userId});
            console.log("User ID:", userId);

            // Create profile
            const responseProfile = await sendProfile({
                ...formDataProfile,
                userId: userId
            });
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
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name"
                        value={formDataProfile.name} 
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
                        type="text" 
                        placeholder="Location" 
                        name="location"
                        value={formDataProfile.location} 
                        onChange={handleChange}  
                        required
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px"
                        }}
                    />
                    <textarea 
                        placeholder="Bio" 
                        name="bio"
                        value={formDataProfile.bio} 
                        onChange={handleChange}  
                        required
                        style={{
                            padding: "10px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            height: "100px"
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

/*
A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
    at input
    at form
    at div
    at div
    at CreateAccount (http://127.0.0.1:5174/src/components/CreateAccount.jsx:25:43)
    at div
    at CreateAccountPage
    at RenderedRoute (http://127.0.0.1:5174/node_modules/.vite/deps/react-router-dom.js?v=f031049e:4087:5)
    at RenderErrorBoundary (http://127.0.0.1:5174/node_modules/.vite/deps/react-router-dom.js?v=f031049e:4047:5)
    at DataRoutes (http://127.0.0.1:5174/node_modules/.vite/deps/react-router-dom.js?v=f031049e:5238:5)
    at Router (http://127.0.0.1:5174/node_modules/.vite/deps/react-router-dom.js?v=f031049e:4500:15)
    at RouterProvider (http://127.0.0.1:5174/node_modules/.vite/deps/react-router-dom.js?v=f031049e:5052:5)
printWarning @ chunk-QXLG2TGQ.js?v=f031049e:519Understand this errorAI
sendProfile.js:18 Error creating profile: SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
    at sendProfile (sendProfile.js:15:39)
    at async handleSubmit (CreateAccount.jsx:50:37)
sendProfile @ sendProfile.js:18Understand this errorAI
CreateAccount.jsx:56 Failed to submit profile: SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
    at sendProfile (sendProfile.js:15:39)
    at async handleSubmit (CreateAccount.jsx:50:37)


*/