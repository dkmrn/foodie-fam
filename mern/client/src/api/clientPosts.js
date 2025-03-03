export const fetchPosts = async () => {
    try {
    const responce = await fetch("http://localhost:5050/post",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await responce.json();
    return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}
