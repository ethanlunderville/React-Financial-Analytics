import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "/node_modules/bootstrap/scss/bootstrap.scss";

import '/public/App.css';
import '/public/About.css';
import '/public/Filterbar.css';
import '/public/Graphs.css';
import '/public/Transaction.css';
import '/public/Tooltip.css'; 
import '/public/Hellobar.css'; 
import '/public/Accountbubble.css'; 
import '/public/Toolnav.css';
import '/public/Spreadsheets.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <App />
)
