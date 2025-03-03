import user from "../../../server/routes/user.js";
import profile from "../../../server/routes/profile.js";

export const sendUser = async (userData) => {
    try{
        const response = await fetch("http://localhost:5050/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
