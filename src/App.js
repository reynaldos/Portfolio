import React, { useState } from 'react';
import styled from 'styled-components';
// import Scene from './threeJs/Scene';
import {useBuildTheme,useBuildUpdate} from './ThemeContext';
import { AccentButton } from './components/accentButton';
import { MouseCursor } from './components/mouse';
import { NavBar } from './components/navBar';
import {SideRails} from './components/siderails';


export const App = () => {
    const currentBuild = useBuildTheme();
    const toggleBuild = useBuildUpdate();
    const [change, setChange] = useState([false, currentBuild]);

    const colorChangeLogic = ()=>{
      if (!change[0]){
        let oldBuild = currentBuild;
        toggleBuild();
        setChange([true,oldBuild]);
        setTimeout(() => {
          setChange([false, currentBuild]);
        }, 900);
      } 
    }

    return (
      <> 
      <MouseCursor/>

      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent:'center',
        placeItems:'center',
        position:'absolute',
        zIndex: '10'}}>

          <NavBar currentBuild={currentBuild}
            onClick={colorChangeLogic} />

          <SideRails currentBuild={currentBuild}/>

          <Title currentBuild={currentBuild}>Rey Sanchez</Title>
        </div>

      <Metal/>
      <Box>
       {change[0] && <><Changer change={change}/> <Rest currentBuild={change[1]}/></>}
         <Test currentBuild={currentBuild}/>
      </Box>
     
      </>
    );

}

export default App;




const Title = styled.h1`
  color: #FCFDFA;
  transition: color 1s ease-out;
  font-size: 42px;
  font-family: 'MatissePro';
  text-transform: uppercase;
  letter-spacing: .2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`



const Test = styled.div`
  background: ${props => props.theme[props.currentBuild].main};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: background-color .3s ease-out;

`


const Box = styled.div`
    top:0;
    left: 0;
    position: relative;
    overflow: hidden;
    width: 100%;
    height:100vh;
`

const Changer = styled.span`
  position: absolute;
  width: 100%;
  height: 15%;
  max-height: 20px;
  background-color: black;
  /* transition: all .8s ease-in; */
  z-index: 100;
  animation: change 1s 1;

  @keyframes change {
  0% {
   top: -105%;
  }

  100% {
   top:150%;
  }
}
`

const Rest = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme[props.currentBuild].main};
  transition: background-color 2s ease-in;
  z-index: 1;
  animation: change 1s 1;

  @keyframes change {
  0% {
   top: 0%;
  }

  100% {
   top:100%;
  }
}

`





const Metal = styled.div`
position: absolute;

  width: 100vw;
  height: 100vh;
  background-image: url('./assets/metal.jpg');
  background-repeat: repeat-x;
  background-position: center; 
  background-size: auto 100vh ;
  z-index: 2;
  opacity: .15;
  background-color: transparent;

`






