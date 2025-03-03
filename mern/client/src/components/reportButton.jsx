


import React, {useState} from 'react';

export function ReportButton({onClick}) {
return (
    <div style={{
        color: "grey",
        textDecoration: "underline"
    }}>
        <button onClick={onClick}>
            Report
            </button>
    </div>
);
};
