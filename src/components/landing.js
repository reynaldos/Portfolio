import React, {useReducer,useEffect} from 'react';
import styled from 'styled-components';
import { SVGicons } from './icons';
import Scene from '../threeJs/Scene';
import { motion } from "framer-motion";


const messages = [
    'Full-stack developer',
    'software enginer', 
    'turns ideas into reality', 
    'problem solver', 
    'fueled by iced coffee',
    'loves learning new things',
    'has a lot of ideas',
    'innovative thinker',
    'uses comments in code',
    'watches too much anime',
];

let stack = [0];


// const titleVarients = {
//     offscreen: {
//         scale: 0,
//         opacity:0,
//         transformOrigin: 'center',
//         y: 5
//     },
//     onscreen: {
//         scale: [0,0,1],
//         opacity: [0,0,1],
//         y: 0,
//         transition: {
//             delay: 1.4,
//             type: "ease",
//             bounce: 0.25,
//             duration: .8
//         }
//     }
// } 

const btnVarients = {
    offscreen: {
        y: 200,
        x: '-50%',
    },
    onscreen: {
        y: 0,
        x: '-50%',
        transition: {
            delay: 1.7,
            type: "spring",
            bounce: 0.25,
            duration: .1,
            scale:{duration: .3}
        }
    }
} 

const defaultState = {
    index: 0,
    status: 'inactive'
}




export const reducer = (state,action) => {
    


  if (action.type === 'ACTIVATE'){

        if(stack.length === messages.length){
            stack = [];
        }

        var newIndex = Math.floor((Math.random()*messages.length));

        while (newIndex === state.index || stack.includes(newIndex)){
            newIndex = Math.floor((Math.random()*messages.length));
        }

        stack.push(newIndex);

      return {
        ...state,
        index: newIndex,
        status: 'active',
    }
  } else if (action.type === 'DEACTIVATE'){
    return {
      ...state,
      status: 'inactive',
    }
  }

  return new Error('no matching action type')
}


export const Landing = ({currentBuild,showElements}) => {

    const [state, dispatch] = useReducer(reducer,defaultState);

    const shuffle = () => {

        if ( state.status === 'inactive'){
            dispatch({type: 'ACTIVATE'})

            setTimeout(() => {
                dispatch({type: 'DEACTIVATE'})
            }, 900);
        }
    }

  return (
    <>
        <Container>
                {/* title */}
                <TitleWrap
                    // initial={'offscreen'}
                    // animate = {showElements ? 'onscreen' : "offscreen"}
                    // variants={titleVarients}
                    >
                    <Title currentBuild={currentBuild}>Rey Sanchez</Title>
                    <Subtitle>{messages[state.index]}</Subtitle>
                </TitleWrap>

            {/* refresh buttom */}
            <ButtonWrap 
                initial={'offscreen'}
                animate = {showElements ? 'onscreen' : "offscreen"}
                variants={btnVarients}

                whileHover={{
                    scale: 1.02,
                    transition: { duration: .3 },
                }}
                whileTap={{ scale: 0.98, transition: { duration: .3 }, }}

                onClick={()=>{
                    
                    shuffle();
            
                    if(state.status==='inactive'){
                        // Dispatch the drop event.
                        const dropEvent = new Event('dropItem');
                        window.dispatchEvent(dropEvent);
                    }
                   
                
                }}
                currentbuild={currentBuild}>
                    <IconWrap
                        status={state.status}>
                        <SVGicons 
                            currentBuild={currentBuild}
                            index={'refresh'}/>
                    </IconWrap>
                    <ButtonTxt currentBuild={currentBuild}>Shuffle</ButtonTxt>
                </ButtonWrap>
        </Container>
        <ThreeJsContainter>
            <Scene status={state.status}/>
        </ThreeJsContainter>
    </>
    
    
  )
}



const Container = styled.section`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
    z-index: 15;
    position:relative;
    /* background-color: blue; */
`



const TitleWrap = styled(motion.div)`
    /* transform: translateY(-25%); */
    max-width: 800px;
    margin: auto 3.5rem;
    display: grid;
    place-content: center;
    /* min-height: 500px; */
    /* margin-bottom: 5rem; */

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        margin: auto;
    } 

   
`


const Title = styled.h1`
    width: 100%;
    color: #FCFDFA;
    transition: color 1s ease-out;
    font-size: 5rem;
    font-family: 'MatissePro';
    text-transform: uppercase;
    letter-spacing: .2rem;
    font-weight: bold;
    text-align: right;

    transition: font-size .3s ease;

    @media screen and (min-width: ${props => props.theme.breakpoint.xl}){
        font-size: 6.5rem;
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        font-size: 3.5rem;
    } 

     @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        font-size: 3rem;
    } 
`

const Subtitle = styled.h4`
    /* background-color: red; */
    overflow-x: hidden;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: .1rem;
    font-weight: 900;
    text-align: center;
    -webkit-text-stroke: 1px white;
    color: transparent;

    
     @media screen and (min-width: ${props => props.theme.breakpoint.xl}){
        font-size: 2rem;
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        font-size: 1.2rem;
       
    } 

`

const ButtonWrap = styled(motion.div)`
    aspect-ratio: 1/1;
    position: absolute;
    left: 50%;
    border-radius: 1.5px;
    border: 2px solid ${props => props.theme[props.currentbuild].accent};
    padding:  .1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    bottom: 2rem;

    transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1),
                border ${props => props.theme.transitionStyleBottom},
                bottom .3s cubic-bezier(0.39, 0.575, 0.565, 1);
                

    &:hover{
        transform-origin:  center;
        transform: translate(-50%, -.3rem) scale(1.05);
    }


    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
       bottom: 1rem;

    } 


`

const IconWrap = styled.div`
    margin: .2rem auto;
    margin-top: .4rem;
    transform-origin: center;
    transition: 
        ${props => props.status !== 'active' ? '': ' transform .9s ease'},
        width .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    transform: ${props => props.status === 'active' ? 'rotate(360deg)': ''};

    

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        width: 60%; 

    } 
`


const ButtonTxt = styled.h3`
    margin-top: .3rem;
    font-size: 1rem;
    font-weight: bold;
    color:${props => props.theme[props.currentBuild].accent};
    text-transform: uppercase;

    transition: color ${props => props.theme.transitionStyleBottom},
                font-size .3s cubic-bezier(0.39, 0.575, 0.565, 1);

     @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
         font-size: .8rem;

    } 

`

const ThreeJsContainter = styled.section`

    position: absolute;
    top: 0;
    left: 0;
    
    background-color: black;
    opacity: .4;   
    width: 100vw;
    height: 100vh;
    /* z-index: 140000; */
    z-index: 14; 

    mask-image: -webkit-gradient(
        linear, 
        center top, 
        center bottom, 
        from(rgba(0,0,0,1)) , 
        to(rgba(0,0,0,0)));
    -webkit-mask-image: -webkit-gradient(
        linear, 
        center top, 
        center bottom, 
        from(rgba(0,0,0,1)) , 
        to(rgba(0,0,0,0)));
`

