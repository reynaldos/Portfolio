import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import {useBuildTheme,useBuildUpdate} from '../ThemeContext';
import { NavBar } from '../components/navBar';
import {SideRails} from '../components/siderails';
import { Landing } from '../components/landing';
import { About } from '../components/about';
import { Projects } from '../components/projects';
import { LoadingScreen } from '../components/loading';
import {Footer} from '../components/footer';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


const loadTime = process.env.REACT_APP_LOADING_TIME;

export const Home = () => {
    const currentBuild = useBuildTheme();
    const toggleBuild = useBuildUpdate();
    const [change, setChange] = useState([false, currentBuild]);
    const [isLoading, setIsLoading] = useState(process.env.REACT_APP_SHOW_LOADING);
    const [fade, setFade] = useState(false);


    

    useEffect(()=>{
      var targetElement = document.querySelector('#root');
      disableBodyScroll(targetElement);

      setTimeout(() => {
       
        if (document.readyState === "complete") {
            // console.log('page already loaded');
            finishLoading();
              
        } else {
            // console.log('page not loaded')
            window.addEventListener("load", finishLoading);
        }

      }, loadTime);
    }, [])

    const finishLoading = () => {
        // console.log('close loading')
        
        window.removeEventListener("load", finishLoading);
        var targetElement = document.querySelector('#root');
        enableBodyScroll(targetElement);
        setFade(true);
        setTimeout(() => {
           setIsLoading(false);
        }, 550);
    }


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
  

     {isLoading && <LoadingScreen fade={fade}/>}
     
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
              <Footer currentBuild={currentBuild}/>
          </div>
          
          {/* dropping old color for color cahnge */}
          {change[0] &&<Rest currentBuild={change[1]}/>}        
      </Content>

      {/* black bar for color change */}
      {change[0] &&<Changer change={change}/> }

      </>
    );

}

export default Home;



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

  overflow: hidden;

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

