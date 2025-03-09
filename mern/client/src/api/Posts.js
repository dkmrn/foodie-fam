export const fetchPosts = async () => {
    try {
    const response = await fetch("http://localhost:5050/post",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export const getPost = async (postId) => {
  try {
  const response = await fetch(`http://localhost:5050/post/${postId}`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  const data = await response.json();
  return data;
  } catch (error) {
      console.error("Error fetching post:", error);
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

  export const addParticipant = async (postId, userId) => {
    try {
      const response = await fetch(`http://localhost:5050/post/${postId}/add-participant`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add participant");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };


  export const removeParticipant = async (postId, userId) => {
    try {
      const response = await fetch(`http://localhost:5050/post/${postId}/add-participant`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove participant");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error removing participant:", error);
      throw error;
    }
  };


  export const editPost = async (postId, postData) => {
    try {
      const response = await fetch(`http://localhost:5050/post/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to edit post");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error editing post:", error);
      throw error;
    }
  };

  export const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5050/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postId),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };
