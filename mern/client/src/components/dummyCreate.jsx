import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './createStyle.css';

export function GoToCreate() {
    return (
        <div style={{ color: "black" }} >
            <button className="createButton" onClick={() => console.log("Clicked!")}>
                Create Post Here!
            </button>
        </div>
    );
  }
