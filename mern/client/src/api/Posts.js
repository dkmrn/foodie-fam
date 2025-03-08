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

export const sendPost = async (postData) => {
    try {
      const response = await fetch("http://localhost:5050/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };