import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function GoToCreate() {
    return (
        <button className="createButton" onClick={() => console.log("Clicked!")}>
        Click Me
        </button>
    );
  }
