import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './createStyle.css';
import { sendPost } from "../api/Post";

export function CreatePost() {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        date: "",
        time: "",
        // additionalInfo: "", //for now, backend does not have parameter for additional info
        lister: { _id: "67c39b3435f7f948775ce6ce", name: "eggert" } //for right now, only eggert
    });

    const [additionalInfo, setAdditionalInfo] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        // console.log("Submitted Data:", { restaurant, address, date, time, additionalInfo });
        // console.log("Submitted Data:", formData);
        try {
            //send formData to backend
            const response = await sendPost(formData);
            console.log("Post Created Successfully:", response);
        } catch (error) {
            console.error("Failed to submit post:", error);
        }
    };

    return <div className="rectangle">
        <div className="text highlight-background" style={{ position: 'absolute', fontSize: '5vh', top: '6vh', color: 'black' }}>
            Cook Up Your FoodieFam Feast!
        </div>


        <div className="text" style={{ position: 'absolute', top: '30vh', color: '#95c1e8' }}>
            Restaurant:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '25vh', width: '25vw', height: '5vh' }} 
                placeholder="BCD"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitted}
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '45vh', color: '#95c1e8' }}>
            Address:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '40vh', width: '25vw', height: '5vh' }} 
                placeholder="123 Christmas Lane"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isSubmitted}
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '60vh', color: '#95c1e8' }}>
            Date:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '55vh', width: '25vw', height: '5vh' }} 
                placeholder="1/1/2026"
                name="date"
                value={formData.date}
                onChange={handleChange}
                disabled={isSubmitted}
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '75vh', color: '#95c1e8' }}>
            Time:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '70vh', width: '25vw', height: '5vh' }} 
                placeholder="0:00"
                name="time"
                value={formData.time}
                onChange={handleChange}
                disabled={isSubmitted}
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '105vh', color: '#95c1e8' }}>
            Additional Info:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '85vh', width: '25vw', height: '20vh' }} 
                placeholder="Any allergies? What dishes are you planning on ordering?"
                // name="additionalInfo"
                // value={formData.additionalInfo}
                // onChange={handleChange}
                // disabled={isSubmitted}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                disabled={isSubmitted}
        ></textarea>


        <div style={{ color: "black" }} >
            <button className="createButton" style={{ position: 'absolute',top:'118vh', left: '50%', transform: 'translate(-50%, -50%)', color: '#95c1e8' }}
                onClick={handleSubmit}
                disabled={isSubmitted}
            >
                {isSubmitted ? "Submitted" : "Submit Post"}
            </button>
        </div>

    </div>;
} 
//NOTE*** when opening the console, the submit post page does not scale correctly --> look into this
    // might need to make it that the text is relative while rectangle is absolute instead