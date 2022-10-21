import React, { useState } from 'react';
import styled from 'styled-components';
// import Scene from './threeJs/Scene';
import {useBuildTheme,useBuildUpdate} from './ThemeContext';

import "./index.css";

export const App = () => {
    const currentBuild = useBuildTheme();
    const toggleBuild = useBuildUpdate();
    const [change, setChange] = useState([false, currentBuild]);

    return (
      <> 
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent:'center',
        placeItems:'center',
        position:'absolute',
        zIndex: '170'}}>
          <Title currentBuild={currentBuild}>Rey Sanchez</Title>
          <AccentButton currentBuild={currentBuild} onClick={()=>{

            if (!change[0]){
              let oldBuild = currentBuild;
              toggleBuild();
              setChange([true,oldBuild]);
              setTimeout(() => {
              setChange([false, currentBuild]);
            }, 1000);}
            }}>Build - 0{currentBuild}</AccentButton>
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
  font-size: 48px;
  font-family: 'MatissePro';
  text-transform: uppercase;
  letter-spacing: 5%;

  text-align: center;
`



const Test = styled.div`
  background-color: ${props => props.theme[props.currentBuild].main};
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
   top:110%;
  }
}
`

const Rest = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme[props.currentBuild].main};
  transition: background-color 2 ease-in;
  z-index: 90;
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
  z-index: 100;
  opacity: .15;
  background-color: transparent;

`

const AccentButton = styled.div`
  height: 30px;
  /* width: 120px; */
  background-color: transparent;
  color:  ${props => props.theme[props.currentBuild].accent};
  transition: all .9s ease-out;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Helvetica';
  font-weight: bold;
  
  padding: .2rem .5rem;
  border-radius: 1.5px;
   /* -webkit-transform: scale(1,1.5);
  -moz-transform: scale(1,1.5);
  -o-transform: scale(1,1.5);
  transform: scale(1,1.5); */
  border: 2px solid  ${props => props.theme[props.currentBuild].accent};
letter-spacing: 50%;
  &:hover{
  cursor: pointer;
}
  

`






const Button = styled.div`
  height: 30px;
  width: 120px;
  background-color: ${props => props.theme[props.currentBuild].btn};
  color: ${props => props.theme[props.currentBuild].btnText};
  transition: all .9s ease-out;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  font-family: 'DesignerGenes';
  padding: .5rem .5rem;
  -webkit-text-stroke-width: ${props => (props.currentBuild !== 1 ? '1px' : '0')};
  -webkit-text-stroke-color:  ${props => (props.currentBuild !== 1 ? 'black' : '')};
  border-radius: 1.5px;
  border: 1px black solid;

  &:hover{
  cursor: pointer;
}
  

`