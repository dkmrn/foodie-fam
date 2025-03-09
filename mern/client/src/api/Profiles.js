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

        //fix the json error from createAccount (parsing empty)
        const text = await response.text(); // Read as text first
        if (!text) {
            return {}; //return empty object instead of parsing empty response
        }
        return JSON.parse(text);

        // const result = await response.json();
        // return result;
    } catch (error) {
        console.error("Error creating profile:", error);
        throw error;
    }
};

export const getProfile = async (userId) => {
    try {
    const response = await fetch(`http://localhost:5050/profile/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
  };


export const updateProfile = async (userId, profileData) => {
    try{
        const response = await fetch(`http://localhost:5050/profile/${userId}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }

        //fix the json error from createAccount (parsing empty)
        const text = await response.text(); // Read as text first
        if (!text) {
            return {}; //return empty object instead of parsing empty response
        }
        return JSON.parse(text);

        // const result = await response.json();
        // return result;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};