import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BuildThemeProvider, BuildStyles} from './ThemeContext';
import { ThemeProvider } from 'styled-components';



ReactDOM.render(  
    <React.StrictMode>   
        <BuildThemeProvider>
            <ThemeProvider theme={BuildStyles}>
                <App />
            </ThemeProvider>
        </BuildThemeProvider> 
    </React.StrictMode>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

