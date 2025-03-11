import { useState } from "react";
import './SubmitReportStyle.css';
import { sendReport } from "../api/Reports";
import {useNavigate} from "react-router-dom";
import { getUserId } from "../main.jsx";


export function SubmitReport() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // additionalInfo: "", //for now, backend does not have parameter for additional info
        userId: getUserId(),
        message: ""
    });


    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            message: e.target.value
        });
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        // console.log("Submitted Data:", { restaurant, address, date, time, additionalInfo });
        // console.log("Submitted Data:", formData);
        try {
            //send formData to backend
            console.log(formData.userId);
            const response = await sendReport(formData);
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
        value={formData.message}
        onChange={handleChange}
        disabled={isSubmitted}
        >
        </textarea>
        </div>
        <button onClick={handleSubmit} disabled={isSubmitted}>Submit Report</button>
    </div>
    );
};