import React, {useState} from 'react';
import { Link } from "react-router-dom";

export function ReportButton() {
return (
    <Link to="/submitReport">
        <div style={{
            color: "grey",
            textDecoration: "underline"
        }}>
            <button>
                Submit Report
                </button>
        </div>
    </Link>
);
};
