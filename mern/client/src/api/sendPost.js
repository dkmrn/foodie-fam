// Utility function to create a new post
export const sendPost = async (postData) => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
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