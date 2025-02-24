import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './createStyle.css';
// might need to make it that the text is relative while rectangle is absolute instead
export function CreatePost() {
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
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '45vh', color: '#95c1e8' }}>
            Address:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '40vh', width: '25vw', height: '5vh' }} 
                placeholder="123 Christmas Lane"
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '60vh', color: '#95c1e8' }}>
            Date:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '55vh', width: '25vw', height: '5vh' }} 
                placeholder="1/1/2026"
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '75vh', color: '#95c1e8' }}>
            Time:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '70vh', width: '25vw', height: '5vh' }} 
                placeholder="0:00"
        ></textarea>


        <div className="text" style={{ position: 'absolute', top: '105vh', color: '#95c1e8' }}>
            Additional Info:
        </div>
        <textarea 
                className="input-box" 
                style={{ position: 'absolute', top: '85vh', width: '25vw', height: '20vh' }} 
                placeholder="Any allergies? What dishes are you planning on ordering?"
        ></textarea>


        <div style={{ color: "black" }} >
            <button className="createButton" style={{ position: 'absolute',top:'118vh', left: '50%', transform: 'translate(-50%, -50%)', color: '#95c1e8' }} onClick={() => console.log("Clicked Submit!")}>
                Submit Post
            </button>
        </div>

    </div>;
}