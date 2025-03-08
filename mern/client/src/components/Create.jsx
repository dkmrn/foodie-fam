import { Link } from "react-router-dom";
// import './createStyle.css';

export function GoToCreate() {
    return (
        <Link to="/create">

            <div style={{ color: "black" }} >
                <button className="createButton" onClick={() => console.log("Clicked Create!")}>
                    Create Post Here!
                </button>
            </div>

        </Link>
);
}
