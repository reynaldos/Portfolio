import React from 'react';
import ReactDOM from "react-dom/client";
// import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import {BuildThemeProvider, BuildStyles} from './ThemeContext';
import { ThemeProvider } from 'styled-components';
import LogRocket from 'logrocket';

LogRocket.init('rey-dev-services/dev-portfolio-iyjv1');

// const container = document.getElementById('root');

// Create a root.
// const root = createRoot(container);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(  
    <React.StrictMode>   
        <BuildThemeProvider>
            <ThemeProvider theme={BuildStyles}>
                <App />
            </ThemeProvider>
        </BuildThemeProvider> 
    </React.StrictMode>
    );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

