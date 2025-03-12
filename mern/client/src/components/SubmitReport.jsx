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


    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);


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

            setShowThankYou(true);

            setTimeout(() => {
                setShowThankYou(false);
                navigate("/goToHomepage");
            }, 2000);

            navigate("/goToHomepage"); //unnecessary

        } catch (error) {
            console.error("Failed to submit post:", error);
        }
    };
    
    return (
        <div>
        {showThankYou && (
            <div className="popup">
                <div className="popup-inside">
                    <p className="text-lg text-[#7a5a31] font-bold">
                        Thank you for submitting! We'll reach out to you soon.
                    </p>
                </div>
            </div>
        )}
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
        required
        >
        </textarea>

        {/* {errorMessage && <p className="text-red-600">{errorMessage}</p>} */}
        </div>
        <button onClick={handleSubmit} disabled={isSubmitted}>Submit Report</button>
    </div>
    );
};