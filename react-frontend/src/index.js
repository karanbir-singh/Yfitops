import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// App's root element
const rootElement = document.getElementById("root");

function App() {
    return (
        <p>React.js is working</p>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
