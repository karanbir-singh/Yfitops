import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// App's root element
const rootElement = document.getElementById("root");

function App() {
    return (
        <p>It works!</p>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
