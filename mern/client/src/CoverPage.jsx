import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import beigebackground from "./assets/beigebackground.png"
import { motion } from "framer-motion";
import LoginPage from "./LoginPage";

// make the welcome page auto refresh


const TypeFont = ({ text, speed = 100, Welcome }) => {
    const [displayedText, setDisplayedText] = useState("");
  
    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) 
            clearInterval(interval);
          if (Welcome) Welcome();
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed, Welcome]);
  
    return (
      <motion.h1 
        className="text-6xl font-bold text-[#d66b4d]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {displayedText}
      </motion.h1>
    );
  };

// const GoToLogin  = () => {
//       function handleClick() {
//           console.log("button -> go to login page");
//       }
      
//       return (
//           <div>
//               <LoginPage />
//           </div>
//       )
//   }

export function CoverPage() {

    const navigate = useNavigate();

    const [welcomeButton, setWelcomeButton] = useState(false);

    return (

        <div style={styles.container}>
            <TypeFont text="Hey there foodie!" speed={150} Welcome={() => setWelcomeButton(true)}/>
        
        {welcomeButton && (
             <motion.button
             style={styles.button}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 3.0 }}
             onClick={() => navigate("/LoginPage")}
             >
             Welcome
         </motion.button>

        )}
        
        </div>
    );
}
   
// Styles matching CreateAccount component
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4e9dc", // Soft beige background
        backgroundImage: `url(${beigebackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Arial', sans-serif",
    },
    button: {
        marginTop: "20px",
        padding: "12px 24px",
        fontSize: "24px",
        backgroundColor: "#5a7d5a", // Soft green
        color: "white",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
};

export default CoverPage;
