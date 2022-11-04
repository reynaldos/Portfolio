import React, { useState } from 'react';
import styled from 'styled-components';
import {useBuildTheme,useBuildUpdate} from './ThemeContext';
import { MouseCursor } from './components/mouse';
import { NavBar } from './components/navBar';
import {SideRails} from './components/siderails';
import { Landing } from './components/landing';
import { About } from './components/about';
import { Projects } from './components/projects';


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
      {/* mouse shape */}
      <MouseCursor/>

      <Content currentBuild={currentBuild}>
          <div style={{
                backgroundColor:`${props => props.theme[props.currentBuild].main}`,
                zIndex: '12'
              }}>
              <NavBar currentBuild={currentBuild}
                onClick={colorChangeLogic} />

              <SideRails currentBuild={currentBuild}/>
              
              {/* content */}
              <Landing currentBuild={currentBuild}/>
              <About currentBuild={currentBuild}/>
              <Projects currentBuild={currentBuild}/>
          </div>
          
          {/* dropping old color for color cahnge */}
          {change[0] &&<Rest currentBuild={change[1]}/>}        
      </Content>

      {/* black bar for color change */}
      {change[0] &&<Changer change={change}/> }

      </>
    );

}

export default App;



const Content = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-image: url('./assets/metal.jpg');
   box-shadow: inset 0 0 0 2000px  ${props => props.theme[props.currentBuild].main};
  /* background:linear-gradient(0deg,  ${props => props.theme[props.currentBuild].main},  ${props => props.theme[props.currentBuild].main}),  url('./assets/metal.jpg'); */
  background-size:contain;

`

const Changer = styled.span`
  position: fixed;
  width: 100%;
  height: 15%;
  max-height: 20px;
  background-color: black;
  /* transition: all .8s ease-in; */
  z-index: 1000;
   top: -105%;
  animation: change 1s 1;

  @keyframes change {
  0% {
   top: -105%;
  }

   10%{
    top: -105%;
  }

  100% {
   top:150%;
  }
}
`

const Rest = styled.span`
  position: fixed;
  width: 100%;
  height: 100%;
  transition: background-color 2s ease-in;
  animation: change 1s 1;
  z-index: 9;
  background-image: url('./assets/metal.jpg');
  box-shadow: inset 0 0 0 2000px ${props => props.theme[props.currentBuild].main};
  background-size:contain;


  @keyframes change {
  0% {
   top: 0%;
  }

  /* 10%{
    top: 0%;
  } */

  100% {
   top:100%;
  }
}

`


const Metal = styled.div`
  position: absolute;

  width: 100vw;
  height: 100%;
  background-image: url('./assets/metal.jpg');
  background-repeat: repeat;
  background-position: center; 
  background-size: auto 100vh ;
  z-index: 2;
  opacity: .15;
  background-color: transparent;

`






