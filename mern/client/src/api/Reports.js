export const sendReport = async (reportData) => {
    try{
        const response = await fetch("http://localhost:5050/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });

        if (!response.ok) {
            throw new Error("Failed to send report");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error sending report:", error);
        throw error;
    }
};