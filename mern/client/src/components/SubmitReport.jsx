import { useState } from "react";
import './SubmitReportStyle.css';
import { sendPost } from "../api/Posts";
import {useNavigate} from "react-router-dom";


export function SubmitReport() {

    const [formData, setFormData] = useState({
        // additionalInfo: "", //for now, backend does not have parameter for additional info
        //userId: getUserId(),
        report: ""
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
            console.log(formData.userId);
            const response = await sendPost(formData);
            console.log("Post Created Successfully:", response);

            navigate("/goToHomepage");

        } catch (error) {
            console.error("Failed to submit post:", error);
        }
    };
    
    return (
        <div>
            <h1 className="report-top">
            Report an issue
                </h1>
        <div className="text-box">

        <textarea
        rows = "4"
        cols = "50"
        placeholder= "Please include as much info as possible..."
        className="comment"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        disabled={isSubmitted}
        >
        </textarea>
        </div>
        <button onClick={handleSubmit} disabled={isSubmitted}>Submit Report</button>
    </div>
    );
};