import React, { useState } from "react";

const SearchBar = ({ onSubmit }) => {
    const [inputText, setInputText] = useState("");

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSubmit(inputText); // Pass search text to parent component
            setInputText("");
        }
    };

    return (
        <input
            type="text"
            value={inputText}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for restaurant..."
            style={styles.input}
        />
    );
};

const styles = {
    input: {
        fontSize: "2vh",  
        width: "25vw",   
        borderRadius: "1vh",  
        border: "0.3vh solid #d66b4d",  // Scales with height
        outline: "none",
        padding: "1vh", 
        margin: "0", 
        position: "absolute",
        right: "16vw",  
        top: "2.5vh", 
    },
};

export default SearchBar;
