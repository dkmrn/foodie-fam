import React from 'react';
import { Link } from "react-router-dom";

export function ReportButton({onClick}) {
return (
    <div style={{
        color: "black",
        textDecoration: "underline"
    }}>
        <button onClick={onClick}>
            Report
            </button>
    </div>
);
};
