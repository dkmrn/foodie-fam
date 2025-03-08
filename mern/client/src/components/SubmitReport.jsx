import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './SubmitReportStyle.css';
//import '@fortawesome/fontawesome-free/css/all.css';
import { sendPost } from "../api/Posts";

export function SubmitReport() {
    
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
        >
        </textarea>
        </div>
    </div>
    );
};