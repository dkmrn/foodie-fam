import user from "../../../server/routes/user.js";
import profile from "../../../server/routes/profile.js";


export const sendProfile = async (profileData) => {
    try{
        const response = await fetch("http://localhost:5050/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error("Failed to create profile");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error creating profile:", error);
        throw error;
    }
};