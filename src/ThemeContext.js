import React,{ useContext, useState} from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useBuildTheme() {
    return useContext(ThemeContext);
}

export function useBuildUpdate() {
    return useContext(ThemeUpdateContext);
}


export function BuildThemeProvider({children}){
    
    const [currentBuild, setCurrentBuild] = useState(1);

    function toggleBuildTheme(){
        let nextBuild = currentBuild + 1;

        if (nextBuild === 3){
            setCurrentBuild(0);
        } else {
            setCurrentBuild(nextBuild);

        }
    }

    return (
    <ThemeContext.Provider value={currentBuild}>
        <ThemeUpdateContext.Provider value={toggleBuildTheme}>
            {children}
        </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>)

}



export const BuildStyles = {
    [0] : {
        main: '#1B41A8',
        accent: '#CC5938',
         btn: '#FCFDFA',
         btnText: '#CC5938'
    },
    [1] : {
        main: '#381C6E',
        accent: '#FEAC4A',
        btn: '#BCD167',
         btnText: '#221A2B'
    },
    [2] : {
        main: '#99221B',
        accent: '#96BA35',
         btn: '#FEAC4A',
         btnText: '#FCFDFA'
    },

    maxWidth : '1400px',
    transitionStyleTop: '.25s ease-in',
    transitionStyleMid: '.55s ease-in',
    transitionStyleBottom: '.8s cubic-bezier(1,.02,.25,.5)',
    letterSpacingDG: '.1rem',
    breakpoint: {
        xs: '400px',
        sm: '576px',
        md: '767px',
        lg: '1000px',
        xl: '1400px',
    }

}